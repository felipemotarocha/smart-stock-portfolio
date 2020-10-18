import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
	_id: string;
	name: string;
	email: string;
	password?: string;
	googleId?: string;
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
		score?: number;
		idealTotalInvested?: number;
		idealPercentageOfThePortfolio?: number;
		idealQuantity?: number;
		quantityAdjustment?: number;
		totalInvestedAdjustment?: number;
		status?: 'Wait' | 'Buy';
	}[];
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
	},
	googleId: {
		type: String,
		default: null,
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

			score: Number,

			idealTotalInvested: Number,
			idealPercentageOfThePortfolio: Number,
			idealQuantity: Number,

			quantityAdjustment: Number,
			totalInvestedAdjustment: Number,

			status: String,
		},
	],
});

const User = model<IUser>('User', userSchema);

export default User;
