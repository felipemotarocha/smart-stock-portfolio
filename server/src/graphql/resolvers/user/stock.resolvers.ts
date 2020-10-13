import { ApolloError } from "apollo-server-express";
import { Arg, FieldResolver, Resolver, Root } from "type-graphql";

import UserType from "../../../graphql/types/user.types";
import StockType from "../../../graphql/types/stock.types";

@Resolver((_of) => UserType)
class StockResolver {
    @FieldResolver(() => StockType)
	async stock(@Root() user: UserType, @Arg('id') id: string) {
		try {
			const stock = (user as any)._doc.stocks.find(
				(stock: StockType) => stock.id.toString() === id
			);
			if (!stock) return new ApolloError('This stock was not found.');

			return stock;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default StockResolver;