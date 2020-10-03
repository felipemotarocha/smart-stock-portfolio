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

@Resolver((_of) => StockType)
class StockResolver {
	@Query(() => [StockType])
	async stocks() {
		const stocks = await Stock.find({});
		return stocks;
	}

	@Query(() => StockType)
	async stock(@Arg('symbol') symbol: string) {
		const stock = await Stock.findOne({ symbol });
		return stock;
	}

	@FieldResolver()
	async buyers(@Root() stock: any) {
		const users = await User.find({ 'stocks.stockId': stock._doc._id });
		return users;
	}

	@Mutation(() => StockType)
	async addStock(
		@Arg('companyName') companyName: string,
		@Arg('symbol') symbol: string,
		@Arg('price') price: number
	) {
		const stock = new Stock({
			companyName,
			symbol,
			price,
		});
		await stock.save();

		return stock;
	}
}

export default StockResolver;
