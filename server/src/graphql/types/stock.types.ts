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

	// buyer's fields
	@Field({ nullable: true })
	quantity: number;

	@Field({ nullable: true })
	totalInvested: number;

	@Field({ nullable: true })
	percentageOfThePortfolio: number;
	// end of buyer's fields
}

export default Stock;
