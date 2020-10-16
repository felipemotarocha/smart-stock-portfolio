import { Resolver } from 'type-graphql';
import { Mutation, Arg } from 'type-graphql';
import jwt from 'jsonwebtoken';

import User from '../../../models/user.model';
import LoginAndRegisterResponseTypes from '../../types/login-and-register.types';

@Resolver()
class LoginWithGoogleResolver {
	@Mutation(() => LoginAndRegisterResponseTypes)
	async loginWithGoogle(
		@Arg('email') email: string,
		@Arg('name') name: string,
		@Arg('googleId') googleId: string
	) {
		let user = await User.findOne({ googleId });
		if (!user) {
			user = new User({ email, name, googleId });
			await user.save();
		}

		return {
			user,
			authToken: jwt.sign(
				{ userId: user._id },
				process.env.JWT_SECRET_KEY!
			),
		};
	}
}

export default LoginWithGoogleResolver;
