import { ApolloError } from 'apollo-server-express';
import { Arg, Mutation, Resolver } from 'type-graphql';

import UserType from '../../types/user.types';
import User from '../../../models/user.model';
import addNewUserStockHelper from '../../../helpers/add-new-user-stock.helpers';
import {
	calculateUserStocksTotalInvested,
	calculateUserBalances,
	calculateUserStocksPercentagesOfThePortfolio,
	calculateUserStocksIdealsAndAdjustments,
} from '../../../helpers/user.helpers';

@Resolver()
class AddNewUserStockResolver {
	@Mutation(() => UserType)
	async addNewUserStock(
		@Arg('userId') userId: string,
		@Arg('symbol') symbol: string,
		@Arg('quantity') quantity: number,
		@Arg('score') score: number
	) {
		try {
			const user = await User.findOne({ _id: userId });

			await addNewUserStockHelper(user!, symbol, quantity, score);

			calculateUserStocksTotalInvested(user!);
			calculateUserBalances(user!);
			calculateUserStocksPercentagesOfThePortfolio(user!);
			calculateUserStocksIdealsAndAdjustments(user!);

			await user?.save();

			return user;
		} catch ({ message }) {
			return new ApolloError(message);
		}
	}
}

export default AddNewUserStockResolver;
