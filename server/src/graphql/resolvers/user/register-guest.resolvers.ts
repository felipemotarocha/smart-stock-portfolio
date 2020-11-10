import { ApolloError } from "apollo-server-express";
import { Resolver } from "type-graphql";
import { Mutation } from "type-graphql";

import User from "../../../models/user.model";
import LoginAndRegisterResponseTypes from "../../../graphql/types/login-and-register.types";
import { generateAuthToken } from "../../../helpers/user.helpers";

@Resolver()
class RegisterGuestResolver {
	@Mutation(() => LoginAndRegisterResponseTypes)
	async loginGuest() {
		try {
			const user = new User({ name: "Guest", guest: true });
			await user.save();

			return {
				user,
				authToken: generateAuthToken(user),
			};
		} catch (err) {
			return new ApolloError("Something went wrong.");
		}
	}
}

export default RegisterGuestResolver;
