import { IUser } from './../../../models/user.model';
import { updateStocksData } from './../../../helpers/user.helpers';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { ContextType } from './../../types/context.types';
import AuthMiddleware from '../../../middlewares/auth.middleware';
import UserType from '../../../graphql/types/user.types';

@Resolver()
class MeResolver {
	@Query(() => UserType)
	@UseMiddleware(AuthMiddleware)
	async me(@Ctx() { req }: ContextType) {
		const user: IUser = (req as any).user;
		updateStocksData(user);

		await user.save();

		return user;
	}
}

export default MeResolver;
