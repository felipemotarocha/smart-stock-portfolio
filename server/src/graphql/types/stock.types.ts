import { ObjectType, Field, ID } from 'type-graphql';
import User from './user.types';

@ObjectType()
class Stock {
	@Field((_type) => ID)
	_id: string;

	@Field()
	companyName: string;

	@Field()
	symbol: string;

	@Field()
	price: number;

	@Field(() => [User])
	buyers: [User];

	@Field()
	quantity: number;
}

export default Stock;
