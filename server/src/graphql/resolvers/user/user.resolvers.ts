import { ApolloError } from 'apollo-server-express';
import { Resolver, Arg, Query } from 'type-graphql';

import UserType from '../../../graphql/types/user.types';
import { updateStocksData } from '../../../helpers/user.helpers';
import User from '../../../models/user.model';

@Resolver()
class UserResolver {
	@Query(() => UserType)
	async user(@Arg('id') id: string) {
		try {
			const user = await User.findById(id);
			await updateStocksData(user!);
			return user;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default UserResolver;
