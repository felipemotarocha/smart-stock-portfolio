import { updateStocksData } from './../../helpers/user.helpers';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';

import User, { IRegisterUserInput } from '../../models/user.model';
import { default as UserType } from '../types/user.types';

@Resolver((_of) => UserType)
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

	@Query(() => [UserType])
	async users() {
		try {
			const users = await User.find({});
			return users;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@Mutation(() => UserType)
	async changeUserAvailableBalance(
		@Arg('id') id: string,
		@Arg('newAvailableBalance') newAvailableBalance: number
	) {
		try {
			console.log(id);
			console.log(newAvailableBalance);
			const user = await User.findById(id);

			user!.availableBalance = newAvailableBalance;
			await user?.save();

			return user;
		} catch (err) {
			console.log(err);
			return new ApolloError('Something went wrong.');
		}
	}

	@Mutation(() => UserType)
	async register(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<IRegisterUserInput | ApolloError> {
		try {
			const hashedPassword = await bcrypt.hash(password, 8);

			const user = new User({ name, email, password: hashedPassword });
			await user.save();

			return user;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@Mutation(() => UserType)
	async addStock(
		@Arg('withCost') withCost: boolean,
		@Arg('userId') userId: string,
		@Arg('symbol') symbol: string,
		@Arg('quantity') quantity: number
	) {
		try {
			const user = await User.findOne({ _id: userId });
			return user!.addStock(withCost, symbol, quantity);
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default UserResolver;
