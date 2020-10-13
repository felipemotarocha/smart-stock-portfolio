import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { ContextType } from './../../types/context.types';
import AuthMiddleware from '../../../middlewares/auth.middleware';
import UserType from '../../../graphql/types/user.types';

@Resolver()
class MeResolver {
	@Query(() => UserType)
	@UseMiddleware(AuthMiddleware)
	async me(@Ctx() { req }: ContextType) {
		return (req as any).user;
	}
}

export default MeResolver;
