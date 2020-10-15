import { ApolloError } from 'apollo-server-express';
import { Arg, Mutation, Resolver } from 'type-graphql';

import UserType from '../../types/user.types';
import User from '../../../models/user.model';

@Resolver()
class AddUserStockResolver {
	@Mutation(() => UserType)
	async addUserStock(
		@Arg('withCost') withCost: boolean,
		@Arg('userId') userId: string,
		@Arg('symbol') symbol: string,
		@Arg('quantity') quantity: number,
		@Arg('note', { nullable: true }) note: number
	) {
		try {
			const user = await User.findOne({ _id: userId });
			return user!.addUserStock(withCost, symbol, quantity, note);
		} catch (err) {
			return new ApolloError(err.message);
		}
	}
}

export default AddUserStockResolver;
