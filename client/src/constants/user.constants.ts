import { Stock } from "../helpers/types/stock.types";
import { User } from "../helpers/types/user.types";

export type GuestUser = {
	_id: string;
	name: string;
	guest: true;
	availableBalance: number;
	investedBalance: number;
	totalBalance: number;
	stocks: Stock[];
};

export const GUEST_USER: GuestUser = {
	_id: "1",
	name: "Guest",
	guest: true,
	availableBalance: 0,
	investedBalance: 0,
	totalBalance: 0,
	stocks: [],
};
