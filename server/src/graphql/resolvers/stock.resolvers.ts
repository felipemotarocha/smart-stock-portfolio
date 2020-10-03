import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import Stock from '../../models/stock.model';
import { default as StockType } from '../types/stock.types';

@Resolver()
class StockResolver {
	@Query(() => [StockType])
	async stocks() {
		const stocks = await Stock.find({});
		return stocks;
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
