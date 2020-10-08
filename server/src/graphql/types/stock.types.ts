import { ObjectType, Field } from 'type-graphql';

export type StockData = {
	id: string;
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

	note: number;
	idealTotalInvested: number;
	idealPercentageOfThePortfolio: number;
	idealQuantity: number;
	status: 'wait' | 'buy';
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

	@Field({ nullable: true })
	note: number;

	@Field({ nullable: true })
	idealTotalInvested: number;

	@Field({ nullable: true })
	idealPercentageOfThePortfolio: number;

	@Field({ nullable: true })
	idealQuantity: number;

	@Field({ nullable: true })
	status: 'Wait' | 'Buy';
}

export default Stock;
