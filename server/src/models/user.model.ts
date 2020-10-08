import { Document, Schema, model } from 'mongoose';
import { ApolloError } from 'apollo-server-express';

import { addStock } from './../helpers/user.helpers';

export interface IUser extends Document {
	_id: string;
	name: string;
	email: string;
	password: string;
	availableBalance: number;
	investedBalance: number;
	totalBalance: number;
	stocks: {
		id?: string;
		name: string;
		symbol: string;
		price: number;
		marketCap: number;
		changePercent: number;
		updatedAt: Date;
		quantity?: number;
		totalInvested?: number;
		percentageOfThePortfolio?: number;

		note?: number;
		idealTotalInvested?: number;
		idealPercentageOfThePortfolio?: number;
		idealQuantity?: number;
	}[];
	addStock: (withCost: boolean, symbol: string, quantity: number) => IUser;
	calculateInvestedBalance: () => IUser;
	calculatePercentageOfThePortfolioOfEachStock: () => IUser;
}

export interface IRegisterUserInput {
	name: IUser['name'];
	email: IUser['email'];
	password: IUser['password'];
}

const userSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	availableBalance: {
		type: Number,
		default: 0,
	},
	investedBalance: {
		type: Number,
		default: 0,
	},
	totalBalance: {
		type: Number,
		default: 0,
	},
	stocks: [
		{
			name: String,
			symbol: String,
			price: Number,
			marketCap: Number,
			changePercent: Number,
			updatedAt: Date,
			quantity: Number,
			totalInvested: Number,
			percentageOfThePortfolio: Number,

			note: Number,

			idealTotalInvested: Number,
			idealPercentageOfThePortfolio: Number,
			idealQuantity: Number,
		},
	],
});

userSchema.pre('save', function (next) {
	const user = this as IUser;

	// format the invested balance to two decimal places if it changes

	if (this.isModified('investedBalance')) {
		user.investedBalance = +user.investedBalance.toFixed(2);
	}

	// calculate the total balance if the available balance changes
	if (this.isModified('availableBalance')) {
		user.totalBalance = user.availableBalance + user.investedBalance;
		user.totalBalance = +user.totalBalance.toFixed(2);

		user.availableBalance = +user.availableBalance.toFixed(2);
	}

	if (this.isModified('availableBalance') || this.isModified('stocks')) {
		const allStockNotesSummed = user.stocks.reduce(
			(accumulator, stock) => accumulator + (stock.note as any),
			0
		);

		for (let stock of user.stocks) {
			// ideal percentage of the portfolio
			stock.idealPercentageOfThePortfolio =
				Math.round((stock.note! / allStockNotesSummed) * 100 * 100) /
				100;

			// ideal total invested
			stock.idealTotalInvested = +(
				(stock.idealPercentageOfThePortfolio / 100) *
				user.totalBalance
			).toFixed(2);

			// ideal quantity
			stock.idealQuantity! = Math.round(
				(stock.idealTotalInvested - stock.totalInvested!) / stock.price
			);
		}
	}

	next();
});

userSchema.methods.addStock = async function (
	withCost: boolean,
	symbol: string,
	quantity: number
) {
	try {
		const user = await addStock(withCost, this as any, symbol, quantity);
		return user;
	} catch (_err) {
		return new ApolloError('Something went wrong.');
	}
};

userSchema.methods.calculateInvestedBalance = async function () {
	try {
		const user: IUser = this as any;
		user.investedBalance = 0;

		const { stocks } = user;
		for (const stock of stocks) {
			user.investedBalance += stock.totalInvested!;
		}

		await user.save();
		return user;
	} catch (_err) {
		return new ApolloError('Something went wrong.');
	}
};

userSchema.methods.calculatePercentageOfThePortfolioOfEachStock = async function () {
	try {
		let user: IUser = this as any;

		for (let stock of user.stocks) {
			stock.percentageOfThePortfolio =
				Math.round(
					((stock.totalInvested! * 100) / user.investedBalance) * 100
				) / 100;
		}

		await user.save();

		return user;
	} catch (_err) {
		return new ApolloError('Something went wrong.');
	}
};

const User = model<IUser>('User', userSchema);

export default User;
