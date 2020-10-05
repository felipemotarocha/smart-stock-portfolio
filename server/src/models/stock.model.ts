import { Document, Schema, Types, model } from 'mongoose';

export interface IStock extends Document {
	name: string;
	symbol: string;
	price: number;
	marketCap: number;
	changePercent: number;
	updatedAt: Date;
	buyers: {
		buyerId: string;
	}[];
	quantity?: number;
	totalInvested?: number;
	percentageOfThePortfolio?: number;
}

const stockSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	symbol: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	marketCap: {
		type: Number,
		required: true,
	},
	changePercent: {
		type: Number,
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
	buyers: [
		{
			_id: false,
			buyerId: Types.ObjectId,
		},
	],
});

const Stock = model<IStock>('Stock', stockSchema);

export default Stock;
