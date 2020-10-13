import { ApolloError } from "apollo-server-express"
import { Resolver } from "type-graphql";
import bcrypt from 'bcryptjs'

import { Mutation, Arg } from "type-graphql";
import User, { IRegisterUserInput } from "../../../models/user.model";
import UserType from "../../../graphql/types/user.types";

@Resolver()
class RegisterResolver {
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
}

export default RegisterResolver;