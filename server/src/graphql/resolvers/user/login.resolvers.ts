import { ApolloError } from "apollo-server-express"
import { Resolver } from "type-graphql";
import { compare } from 'bcryptjs'
import { Mutation, Arg } from "type-graphql";
import jwt from 'jsonwebtoken'

import User from "../../../models/user.model";
import UserType from "../../types/user.types";

@Resolver()
class LoginResolver {
    @Mutation(() => UserType)
	async login(@Arg("email") email: string, @Arg("password") password: string) {
	  const user = await User.findOne({ email });
  
	  if (!user) {
        return new ApolloError('Something went wrong.')

	  }
  
	  const isValidPassword = compare(password, user.password);
  
	  if (!isValidPassword) {
		return new ApolloError('Something went wrong.')
	  }
  
	  return {
		accessToken: jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY!)
	  };
	}
	
}

export default LoginResolver;