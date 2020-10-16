import { ApolloError } from 'apollo-server-express';
import { Resolver } from 'type-graphql';
import { compare } from 'bcryptjs';
import { Mutation, Arg } from 'type-graphql';

import User from '../../../models/user.model';
import LoginAndRegisterResponseTypes from '../../types/login-and-register.types';
import { generateAuthToken } from './../../../helpers/user.helpers';

@Resolver()
class LoginWithCredentialsResolver {
	@Mutation(() => LoginAndRegisterResponseTypes)
	async loginWithCredentials(
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		const user = await User.findOne({ email });
		if (!user) return new ApolloError('Something went wrong.');

		const isValidPassword = await compare(password, user.password!);
		if (!isValidPassword) return new ApolloError('Something went wrong.');

		return {
			user,
			authToken: generateAuthToken(user),
		};
	}
}

export default LoginWithCredentialsResolver;
