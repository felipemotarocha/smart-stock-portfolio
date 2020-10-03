import { ObjectType, Field, ID } from 'type-graphql';
import User from './user.types';

@ObjectType()
class Stock {
	@Field((_type) => ID)
	id: string;

	@Field()
	companyName: string;

	@Field()
	symbol: string;

	@Field()
	price: number;

	@Field(() => [User])
	owners: [User];
}

export default Stock;
