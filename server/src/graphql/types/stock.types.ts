import { ObjectType, Field } from 'type-graphql';

export type StockData = {
	symbol: string;
	name: string;
	region: string;
	currency: string;
	market_time: {
		open: string;
		close: string;
		timezone: number;
	};
	market_cap: number;
	price: number;
	change_percent: number;
	updated_at: Date;
};

@ObjectType()
class Stock {
	@Field()
	id: string;

	@Field()
	name: string;

	@Field()
	symbol: string;

	@Field()
	price: number;

	@Field()
	marketCap: number;

	@Field()
	changePercent: number;

	@Field()
	updatedAt: Date;

	@Field({ nullable: true })
	quantity: number;

	@Field({ nullable: true })
	totalInvested: number;

	@Field({ nullable: true })
	percentageOfThePortfolio: number;
}

export default Stock;
