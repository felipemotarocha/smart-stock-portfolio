import { ApolloError } from 'apollo-server-express';
import { Arg, FieldResolver, Resolver, Root } from 'type-graphql';

import UserType from '../../../graphql/types/user.types';
import StockType from '../../../graphql/types/stock.types';

@Resolver((_of) => UserType)
class StocksResolver {
	@FieldResolver(() => StockType)
	async stocks(
		@Root() user: UserType,
		@Arg('sortBy', { nullable: true }) sortBy: 'totalInvestedAdjustment'
	) {
		try {
			if (sortBy) {
				const stocks = (user as any)._doc.stocks.sort(
					(a: any, b: any) => b[sortBy] - a[sortBy]
				);
				return stocks;
			}

			return (user as any)._doc.stocks;
		} catch (err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default StocksResolver;
