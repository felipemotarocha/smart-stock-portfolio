import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
	_id: string;
	guest: boolean;
	name?: string;
	email?: string;
	password?: string;
	googleId?: string;
	availableBalance: number;
	investedBalance: number;
	totalBalance: number;
	stocks: {
		_id?: string;
		name: string;
		symbol: string;
		price: number;
		marketCap?: number;
		changePercent?: number;
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
		status?: "Wait" | "Buy";
	}[];
}

export interface IRegisterUserInput {
	name: IUser["name"];
	email: IUser["email"];
	password: IUser["password"];
}

const userSchema: Schema = new Schema({
	guest: {
		type: Boolean,
		default: false,
	},
	name: {
		type: String,
	},
	email: {
		type: String,
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
			marketCap: {
				type: Number,
				default: 0,
			},
			changePercent: {
				type: Number,
				default: 0,
			},
			updatedAt: Date,
			quantity: Number,
			totalInvested: {
				type: Number,
				default: 0,
			},
			percentageOfThePortfolio: {
				type: Number,
				default: 0,
			},

			score: Number,

			idealTotalInvested: {
				type: Number,
				default: 0,
			},
			idealPercentageOfThePortfolio: {
				type: Number,
				default: 0,
			},
			idealQuantity: {
				type: Number,
				default: 0,
			},

			quantityAdjustment: {
				type: Number,
				default: 0,
			},
			totalInvestedAdjustment: {
				type: Number,
				default: 0,
			},

			status: String,
		},
	],
});

const User = model<IUser>("User", userSchema);

export default User;
