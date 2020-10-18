export type Stock = {
	id: string;
	name: string;
	symbol: string;
	price: number;
	marketCap: number;
	changePercent: number;
	updatedAt: Date;
	quantity: number;
	totalInvested: number;
	percentageOfThePortfolio: number;

	score: number;
	idealTotalInvested: number;
	idealPercentageOfThePortfolio: number;
	idealQuantity: number;

	quantityAdjustment: number;
	totalInvestedAdjustment: number;

	status: 'Wait' | 'Buy';
};
