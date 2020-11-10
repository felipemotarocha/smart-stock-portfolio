import { ApolloError } from "apollo-server-express";
import { Arg, Resolver } from "type-graphql";
import { Mutation } from "type-graphql";

import User from "../../../models/user.model";
import UserType from "../../../graphql/types/user.types";

@Resolver()
class DeleteGuestUserResolver {
	@Mutation(() => UserType)
	async deleteGuestUser(@Arg("guestId") guestId: string) {
		try {
			const user = await User.findByIdAndDelete(guestId);

			if (!user) throw new ApolloError("User not found.");

			return user;
		} catch (err) {
			return new ApolloError("Something went wrong.");
		}
	}
}

export default DeleteGuestUserResolver;
