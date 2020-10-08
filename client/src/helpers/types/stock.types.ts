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

	note: number;
	idealTotalInvested: number;
	idealPercentageOfThePortfolio: number;
	idealQuantity: number;
	status: 'Wait' | 'Buy';
};
