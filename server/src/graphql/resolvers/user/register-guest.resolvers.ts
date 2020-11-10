import { ApolloError } from "apollo-server-express";
import { Resolver } from "type-graphql";
import { Mutation } from "type-graphql";

import User from "../../../models/user.model";
import LoginAndRegisterResponseTypes from "../../../graphql/types/login-and-register.types";
import { generateAuthToken } from "../../../helpers/user.helpers";

@Resolver()
class RegisterGuestResolver {
	@Mutation(() => LoginAndRegisterResponseTypes)
	async registerGuest() {
		try {
			const user = new User({ guest: true });
			await user.save();

			return {
				user,
				authToken: generateAuthToken(user),
			};
		} catch (err) {
			console.log(err.message);
			return new ApolloError("Something went wrong.");
		}
	}
}

export default RegisterGuestResolver;
