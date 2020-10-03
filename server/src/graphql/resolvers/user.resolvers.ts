import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import User, { IRegisterUserInput } from '../../models/user.model';
import bcrypt from 'bcryptjs';
import { default as UserType } from '../types/user.types';

@Resolver()
class UserResolver {
	@Query(() => [UserType])
	async users() {
		const users = await User.find({});
		return users;
	}

	@Mutation(() => UserType)
	async register(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<IRegisterUserInput> {
		const hashedPassword = await bcrypt.hash(password, 8);

		const user = new User({ name, email, password: hashedPassword });
		await user.save();

		return user;
	}
}

export default UserResolver;
