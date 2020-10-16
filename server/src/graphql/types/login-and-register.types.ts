import { ObjectType, Field } from 'type-graphql';

import UserType from './user.types';

@ObjectType()
class LoginAndRegisterResponseTypes {
	@Field()
	user: UserType;

	@Field()
	authToken: string;
}

export default LoginAndRegisterResponseTypes;
