import { ApolloError } from 'apollo-server-express';

import { Arg, Mutation, Resolver } from 'type-graphql';
import UserType from '../../types/user.types';
import User from '../../../models/user.model';
import {
	calculateUserBalances,
	calculateUserStocksIdealsAndAdjustments,
} from '../../../helpers/user.helpers';

@Resolver()
class ChangeUserAvailableBalanceResolver {
	@Mutation(() => UserType)
	async changeUserAvailableBalance(
		@Arg('id') id: string,
		@Arg('newAvailableBalance') newAvailableBalance: number
	) {
		try {
			const user = await User.findById(id);

			user!.availableBalance = +newAvailableBalance.toFixed(2);
			calculateUserBalances(user!);
			calculateUserStocksIdealsAndAdjustments(user!);
			await user?.save();

			return user;
		} catch (err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default ChangeUserAvailableBalanceResolver;
