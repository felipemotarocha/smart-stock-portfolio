import { ApolloError } from 'apollo-server-express';
import { Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { Mutation, Arg } from 'type-graphql';

import User from '../../../models/user.model';
import LoginAndRegisterResponseTypes from '../../../graphql/types/login-and-register.types';
import { generateAuthToken } from '../../../helpers/user.helpers';

@Resolver()
class RegisterResolver {
	@Mutation(() => LoginAndRegisterResponseTypes)
	async register(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		try {
			if (password.length < 6)
				return new ApolloError(
					'The password must contain at least 6 characters.'
				);

			const existentUser = await User.findOne({ email });
			if (existentUser && !existentUser.googleId)
				return new ApolloError('This email is already in use.');

			const hashedPassword = await bcrypt.hash(password, 8);
			const user = new User({ name, email, password: hashedPassword });
			await user.save();

			return {
				user,
				authToken: generateAuthToken(user),
			};
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default RegisterResolver;
