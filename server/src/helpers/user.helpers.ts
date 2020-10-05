import { IUser } from './../models/user.model';
import { IStock } from './../models/stock.model';
import { updateStockPrice } from './stock.helpers';

export const updateUserStocksData = async (
	databaseStocks: IStock[],
	user: IUser
) => {
	for (let stock of databaseStocks) {
		await updateStockPrice(stock);

		user.stocks.forEach(async (userStock, index) => {
			if (userStock.stockId.toString() === stock._id.toString()) {
				stock.quantity = userStock.quantity;
				stock.totalInvested = stock.quantity * stock.price;

				if (index === 0) {
					user.investedBalance = stock.totalInvested;
				} else {
					user.investedBalance += stock.totalInvested;
				}
			}
		});

		await user.save();

		for (let stock of databaseStocks) {
			stock.percentageOfThePortfolio =
				Math.round(
					((stock.totalInvested! * 100) / user.investedBalance) * 100
				) / 100;
		}
	}
};
