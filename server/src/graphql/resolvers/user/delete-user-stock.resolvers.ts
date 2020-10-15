import { ApolloError } from 'apollo-server-express';

import { Arg, Mutation, Resolver } from 'type-graphql';
import UserType from '../../types/user.types';
import User from '../../../models/user.model';
import {
	calculateUserBalances,
	calculateUserStocksIdealsAndAdjustments,
	calculateUserStocksPercentagesOfThePortfolio,
} from '../../../helpers/user.helpers';

@Resolver()
class DeleteUserStockResolver {
	@Mutation(() => UserType)
	async deleteUserStock(
		@Arg('userId') id: string,
		@Arg('stockId') stockId: string
	) {
		try {
			const user = await User.findById(id);
			if (!user) return new ApolloError('User not found.');

			user.stocks = user.stocks.filter((stock) => stock.id !== stockId);

			calculateUserBalances(user);
			calculateUserStocksPercentagesOfThePortfolio(user);
			calculateUserStocksIdealsAndAdjustments(user);

			await user.save();

			return user;
		} catch (err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default DeleteUserStockResolver;
