import { IUser } from '../models/user.model';
import checkIfTheUserAlreadyHasTheStock from './check-if-the-user-already-has-the-stock.helpers';
import fetchStockData from './fetch-stock-data.helpers';

const addNewUserStockHelper = async (
	user: IUser,
	symbol: string,
	quantity: number,
	note: number
) => {
	if (checkIfTheUserAlreadyHasTheStock(user, symbol))
		throw new Error(
			'You already have this stock. You can buy more using your available balance or change its quantity.'
		);

	const stock = await fetchStockData(symbol);
	if (checkIfTheUserAlreadyHasTheStock(user, stock.symbol))
		throw new Error(
			'You already have this stock. You can buy more using your available balance or change its quantity.'
		);
	const { name, price, market_cap, change_percent, updated_at } = stock;
	user.stocks.push({
		name,
		symbol: symbol.toUpperCase(),
		price,
		quantity,
		note,
		marketCap: market_cap,
		changePercent: change_percent,
		updatedAt: updated_at,
		totalInvested: +(quantity * price).toFixed(2),
	});

	return user;
};

export default addNewUserStockHelper;
