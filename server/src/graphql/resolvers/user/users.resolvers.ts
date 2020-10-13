import { ApolloError } from "apollo-server-express";
import { Resolver, Query } from "type-graphql";

import UserType from "../../../graphql/types/user.types";
import User from "../../../models/user.model";

@Resolver()
class UsersResolvers {
    @Query(() => [UserType])
	async users() {
		try {
			const users = await User.find({});
			return users;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default UsersResolvers;