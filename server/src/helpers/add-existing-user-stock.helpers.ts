import { ApolloError } from 'apollo-server-express';
import { IUser } from '../models/user.model';
import checkIfTheUserAlreadyHasTheStock from './check-if-the-user-already-has-the-stock.helpers';
import fetchStockData from './fetch-stock-data.helpers';

const addExistingUserStockHelper = async (
	user: IUser,
	symbol: string,
	quantity: number
) => {
	try {
		const stock = await fetchStockData(symbol);

		if (!checkIfTheUserAlreadyHasTheStock(user, symbol))
			throw new Error(
				'You do not have this stock. To buy it, you need to first add it to your portfolio using the "New" buton.'
			);
		if (user.availableBalance < stock.price * quantity)
			throw new Error(
				'You do not have enough money to make this transaction.'
			);

		const { stocks: userStocks } = user;
		for (let userStock of userStocks) {
			if (userStock.symbol === stock.symbol) {
				(userStock.price = stock.price),
					(userStock.marketCap = stock.market_cap),
					(userStock.updatedAt = stock.updated_at),
					(userStock.changePercent = stock.change_percent),
					(userStock.quantity = userStock.quantity! + quantity),
					(userStock.totalInvested = +(
						quantity * stock.price
					).toFixed(2));
			}
		}

		user.availableBalance -= stock.price * quantity;

		return user;
	} catch ({ message }) {
		return new ApolloError(message);
	}
};

export default addExistingUserStockHelper;
