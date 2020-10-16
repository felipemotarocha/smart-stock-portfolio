import { ObjectType, Field, ID } from 'type-graphql';

import Stock from './stock.types';

@ObjectType()
class UserType {
	@Field((_type) => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	email: string;

	@Field({ nullable: true })
	password: string;

	@Field({ nullable: true })
	googleId: string;

	@Field()
	availableBalance: number;

	@Field()
	investedBalance: number;

	@Field()
	totalBalance: number;

	@Field((_type) => [Stock])
	stocks: Stock[];
}

export default UserType;
