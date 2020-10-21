import { ObjectType, Field } from 'type-graphql';

export type StockData = {
	_id: string;
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
class StockType {
	@Field()
	_id: string;

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
	score: number;

	@Field({ nullable: true })
	idealTotalInvested: number;

	@Field({ nullable: true })
	idealPercentageOfThePortfolio: number;

	@Field({ nullable: true })
	idealQuantity: number;

	@Field({ nullable: true })
	quantityAdjustment: number;

	@Field({ nullable: true })
	totalInvestedAdjustment: number;

	@Field({ nullable: true })
	status: 'Wait' | 'Buy';
}

export default StockType;
