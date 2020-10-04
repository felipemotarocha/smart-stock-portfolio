import { Document, Schema, Types, model } from 'mongoose';

export interface IStock extends Document {
	companyName: string;
	symbol: string;
	price: number;
	buyers: {
		buyerId: string;
	}[];
	quantity?: number;
	totalInvested?: number;
	percentageOfThePortfolio?: number;
}

const stockSchema: Schema = new Schema({
	companyName: {
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
	buyers: [
		{
			buyerId: Types.ObjectId,
		},
	],
});

const Stock = model<IStock>('Stock', stockSchema);

export default Stock;
