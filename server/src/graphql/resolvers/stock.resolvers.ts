import { IStock } from './../../models/stock.model';
import {
	Resolver,
	Query,
	Mutation,
	Arg,
	FieldResolver,
	Root,
} from 'type-graphql';
import Stock from '../../models/stock.model';
import User from '../../models/user.model';
import { default as StockType } from '../types/stock.types';
import { ApolloError } from 'apollo-server-express';

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
	async addStock(
		@Arg('companyName') companyName: string,
		@Arg('symbol') symbol: string,
		@Arg('price') price: number
	) {
		try {
			const stock = new Stock({
				companyName,
				symbol,
				price,
			});
			await stock.save();

			return stock;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default StockResolver;
