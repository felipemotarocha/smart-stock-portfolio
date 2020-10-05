import { IStock } from './../models/stock.model';
import axios from 'axios';

export type StockData = {
	symbol: string;
	name: string;
	region: string;
	currency: string;
	market_time: {
		open: string;
		close: string;
		timezone: number;
	};
	market_cap: number;
	price: number;
	change_percent: number;
	updated_at: Date;
};

export const updateStockPrice = async (stock: IStock) => {
	const {
		data: { results },
	} = await axios.get(
		`https://api.hgbrasil.com/finance/stock_price?key=${process.env.HG_FINANCE_KEY}&symbol=${stock.symbol}`
	);

	const stockData: StockData = results[stock.symbol.toUpperCase()];

	stock.price = stockData.price;
	await stock.save();
};
