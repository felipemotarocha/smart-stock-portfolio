import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';

import { ContextType } from './../graphql/types/context.types';
import User from '../models/user.model';

const AuthMiddleware: MiddlewareFn<ContextType> = async (
	{ context: { req } },
	next
) => {
	try {
		const token = req.header('Authorization')!.replace('Bearer ', '');
		if (!token)
			return new ApolloError('Please authenticate and try again.');

		const decoded: any = verify(token, process.env.JWT_SECRET_KEY!);

		const user = await User.findById(decoded.userId);
		if (!user) return new ApolloError('Please authenticate and try again.');

		(req as any).user = user;
		return next();
	} catch (err) {
		return new ApolloError('Something went wrong.');
	}
};

export default AuthMiddleware;
