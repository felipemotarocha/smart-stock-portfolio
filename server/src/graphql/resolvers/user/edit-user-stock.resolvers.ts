import { ApolloError } from 'apollo-server-express';
import { Arg, Mutation, Resolver } from 'type-graphql';

import {
	calculateUserBalances,
	calculateUserStocksIdealsAndAdjustments,
	calculateUserStocksPercentagesOfThePortfolio,
	calculateUserStocksTotalInvested,
} from '../../../helpers/user.helpers';
import UserType from '../../types/user.types';
import User from '../../../models/user.model';

@Resolver()
class EditUserStockResolver {
	@Mutation(() => UserType)
	async editUserStock(
		@Arg('userId') userId: string,
		@Arg('stockId') stockId: string,
		@Arg('score', { nullable: true }) score: number,
		@Arg('quantity', { nullable: true }) quantity: number
	) {
		try {
			const user = await User.findById(userId);
			const stock = user!.stocks.find(
				(stock) => stock.id!.toString() === stockId
			);

			if (score) stock!.score = score;
			if (quantity) stock!.quantity = quantity;

			calculateUserStocksTotalInvested(user!);
			calculateUserBalances(user!);
			calculateUserStocksPercentagesOfThePortfolio(user!);
			calculateUserStocksIdealsAndAdjustments(user!);

			await user!.save();
			return user;
		} catch (err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default EditUserStockResolver;
