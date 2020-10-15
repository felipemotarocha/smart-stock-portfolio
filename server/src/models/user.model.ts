import { Document, Schema, model } from 'mongoose';
import { ApolloError } from 'apollo-server-express';

import {
	addUserStock,
	calculateUserStocksIdealsAndAdjustments,
} from './../helpers/user.helpers';

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

		quantityAdjustment?: number;
		totalInvestedAdjustment?: number;

		status?: 'Wait' | 'Buy';
	}[];
	addUserStock: (
		withCost: boolean,
		symbol: string,
		quantity: number,
		note?: number
	) => IUser;
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

			quantityAdjustment: Number,
			totalInvestedAdjustment: Number,

			status: String,
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
	if (
		this.isModified('availableBalance') ||
		this.isModified('investedBalance')
	) {
		user.totalBalance = +(
			user.availableBalance + user.investedBalance
		).toFixed(2);
		user.availableBalance = +user.availableBalance.toFixed(2);
	}

	if (this.isModified('availableBalance') || this.isModified('stocks')) {
		calculateUserStocksIdealsAndAdjustments(user);
	}

	next();
});

userSchema.methods.addUserStock = async function (
	withCost: boolean,
	symbol: string,
	quantity: number,
	note: number
) {
	try {
		const user = await addUserStock(
			withCost,
			this as any,
			symbol,
			quantity,
			note
		);
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
			if (user.investedBalance === 0 || stock.totalInvested! === 0) {
				stock.percentageOfThePortfolio = 0;
				return;
			}
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
