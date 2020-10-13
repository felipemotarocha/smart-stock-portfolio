import { ApolloError } from 'apollo-server-express';
import { Arg, Mutation, Resolver } from 'type-graphql';

import UserType from '../../../graphql/types/user.types';
import User from '../../../models/user.model';

@Resolver()
class ChangeStockNote {
	@Mutation(() => UserType)
	async changeStockNote(
		@Arg('userId') userId: string,
		@Arg('stockId') stockId: string,
		@Arg('note') note: number
	) {
		try {
			const user = await User.findById(userId);
			const stock = user!.stocks.find(
				(stock) => stock.id!.toString() === stockId
			);
			stock!.note = note;
			await user?.save();

			return user;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default ChangeStockNote;