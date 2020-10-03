import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class Stock {
	@Field()
	symbol: string;

	@Field()
	quantity: number;
}

export default Stock;
