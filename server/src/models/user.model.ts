import { addStock } from './../helpers/user.helpers';
import { Document, Schema, model } from 'mongoose';
import { ApolloError } from 'apollo-server-express';

export interface IUser extends Document {
	_id: string;
	name: string;
	email: string;
	password: string;
	availableBalance: number;
	investedBalance: number;
	stocks: {
		name: string;
		symbol: string;
		price: number;
		marketCap: number;
		changePercent: number;
		updatedAt: Date;
		quantity?: number;
		totalInvested?: number;
		percentageOfThePortfolio?: number;
	}[];
	addStock: (withCost: boolean, symbol: string, quantity: number) => IUser;
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
	stocks: [
		{
			_id: false,
			name: String,
			symbol: String,
			price: Number,
			marketCap: Number,
			changePercent: Number,
			updatedAt: Date,
			quantity: Number,
			totalInvested: Number,
			percentageOfThePortfolio: Number,
		},
	],
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

const User = model<IUser>('User', userSchema);

export default User;
