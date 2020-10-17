import { ApolloError } from 'apollo-server-express';
import { Arg, Mutation, Resolver } from 'type-graphql';

import UserType from '../../types/user.types';
import User from '../../../models/user.model';
import addExistingUserStockHelper from '../../../helpers/add-existing-user-stock.helpers';
import {
	calculateUserBalances,
	calculateUserStocksIdealsAndAdjustments,
	calculateUserStocksPercentagesOfThePortfolio,
	calculateUserStocksTotalInvested,
} from '../../../helpers/user.helpers';

@Resolver()
class AddExistingUserStockResolver {
	@Mutation(() => UserType)
	async addExistingUserStock(
		@Arg('userId') userId: string,
		@Arg('symbol') symbol: string,
		@Arg('quantity') quantity: number
	) {
		try {
			const user = await User.findOne({ _id: userId });

			await addExistingUserStockHelper(user!, symbol, quantity);

			calculateUserStocksTotalInvested(user!);
			calculateUserBalances(user!);
			calculateUserStocksPercentagesOfThePortfolio(user!)!;
			calculateUserStocksIdealsAndAdjustments(user!);

			await user!.save();

			return user;
		} catch (err) {
			return new ApolloError(err.message);
		}
	}
}

export default AddExistingUserStockResolver;
