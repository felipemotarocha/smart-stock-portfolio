import axios from 'axios';
import { ApolloError } from 'apollo-server-express';
import { differenceInMinutes, getHours, isSaturday, isSunday } from 'date-fns';

import { IUser } from './../models/user.model';
import { StockData } from 'src/graphql/types/stock.types';

export const addStock = async (
	withCost: boolean,
	user: IUser,
	symbol: string,
	quantity: number
) => {
	try {
		const {
			data: { results },
		} = await axios.get(
			`https://api.hgbrasil.com/finance/stock_price?key=${process.env.HG_FINANCE_KEY}&symbol=${symbol}`
		);

		const stockData: StockData = results[symbol.toUpperCase()];
		const {
			name,
			price,
			market_cap,
			change_percent,
			updated_at,
		} = stockData;

		if (withCost && user.availableBalance < price * quantity)
			return new ApolloError(
				'You do not have enough money to make this transaction.'
			);

		// user.investedBalance += price * quantity;
		if (withCost) user.availableBalance -= price * quantity;

		const userAlreadyHasTheStock = user.stocks.findIndex(
			(stock) => stock.symbol === symbol.toUpperCase()
		);
		if (userAlreadyHasTheStock !== -1) {
			user.stocks[userAlreadyHasTheStock].quantity! += quantity;

			user.stocks[userAlreadyHasTheStock].totalInvested =
				user.stocks[userAlreadyHasTheStock].quantity! * price;
			user.stocks[userAlreadyHasTheStock].totalInvested = +user.stocks[
				userAlreadyHasTheStock
			].totalInvested!.toFixed(2);

			user.stocks[userAlreadyHasTheStock].price = price;
			user.stocks[userAlreadyHasTheStock].marketCap = market_cap;
			user.stocks[userAlreadyHasTheStock].updatedAt = updated_at;
			user.stocks[userAlreadyHasTheStock].changePercent = change_percent;
		} else {
			user.stocks.push({
				name,
				symbol: stockData.symbol,
				price,
				marketCap: market_cap,
				changePercent: change_percent,
				updatedAt: updated_at,
				quantity,
				totalInvested: quantity * price,
			});
		}
		user.calculateInvestedBalance();
		user.calculatePercentageOfThePortfolioOfEachStock();

		return user;
	} catch (err) {
		console.log(err);
		return new ApolloError('Something went wrong.');
	}
};

export const updateStocksData = async (
	user: IUser,
	forcedUpdate: boolean = false
) => {
	const now = new Date();

	const currentTime = getHours(now);
	if (
		isSaturday(now) ||
		isSunday(now) ||
		currentTime < 9 ||
		(currentTime > 18 && !forcedUpdate)
	)
		return;

	for (let stock of user.stocks) {
		const minutesOfDifference = differenceInMinutes(now, stock.updatedAt);
		if (minutesOfDifference > 65 || forcedUpdate) {
			const {
				data: { results },
			} = await axios.get(
				`https://api.hgbrasil.com/finance/stock_price?key=${process.env.HG_FINANCE_KEY}&symbol=${stock.symbol}`
			);

			const stockData: StockData = results[stock.symbol.toUpperCase()];
			const { price, market_cap, change_percent, updated_at } = stockData;

			stock.price = price;
			stock.marketCap = market_cap;
			stock.changePercent = change_percent;
			stock.updatedAt = updated_at;
			stock.totalInvested = stock.price * stock.quantity!;

			user.calculatePercentageOfThePortfolioOfEachStock();
		}
	}
	return;
};
