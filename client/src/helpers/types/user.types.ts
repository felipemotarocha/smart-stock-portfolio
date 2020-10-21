import { Stock } from './stock.types';

export type User = {
	_id: string;
	name: string;
	email: string;
	password: string;
	availableBalance: number;
	investedBalance: number;
	totalBalance: number;
	stocks: Stock[];
};
