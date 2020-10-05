import { IStock } from './../../models/stock.model';
import {
	Resolver,
	Query,
	Mutation,
	Arg,
	FieldResolver,
	Root,
} from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import axios from 'axios';

import Stock from '../../models/stock.model';
import User from '../../models/user.model';
import { default as StockType } from '../types/stock.types';
import { StockData } from 'src/helpers/stock.helpers';
// import { StockPriceResponse } from '../types/axios.types';

@Resolver((_of) => StockType)
class StockResolver {
	@Query(() => [StockType])
	async stocks() {
		try {
			const stocks = await Stock.find({});
			return stocks;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@Query(() => StockType)
	async stock(@Arg('symbol') symbol: string) {
		try {
			const stock = await Stock.findOne({ symbol });
			return stock;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@FieldResolver()
	async buyers(@Root() stock: IStock) {
		try {
			const users = await User.find({ 'stocks.stockId': stock._id });
			return users;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@Mutation(() => StockType)
	async addStockToTheDatabase(@Arg('symbol') symbol: string) {
		try {
			const stockAlreadyExists = await Stock.findOne({
				symbol: symbol.toUpperCase(),
			});
			if (stockAlreadyExists)
				return new ApolloError(
					'This stock already exists in the database.'
				);

			const {
				data: { results },
			} = await axios.get(
				`https://api.hgbrasil.com/finance/stock_price?key=${process.env.HG_FINANCE_KEY}&symbol=${symbol}`
			);
			if (!results) throw new ApolloError('This stock was not found.');

			const stockData: StockData = results[symbol.toUpperCase()];

			const {
				name,
				price,
				market_cap,
				change_percent,
				updated_at,
			} = stockData;
			const stock = new Stock({
				name,
				symbol: stockData.symbol,
				price,
				marketCap: market_cap,
				changePercent: change_percent,
				updatedAt: updated_at,
			});
			await stock.save();

			return stock;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default StockResolver;
