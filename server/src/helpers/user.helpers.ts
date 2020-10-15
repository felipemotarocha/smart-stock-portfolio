import axios from 'axios';
import { ApolloError } from 'apollo-server-express';
import { differenceInMinutes, getHours, isSaturday, isSunday } from 'date-fns';

import { IUser } from './../models/user.model';
import { StockData } from 'src/graphql/types/stock.types';

export const calculateUserStocksTotalInvested = (user: IUser) => {
	const { stocks } = user;

	let totalInvested = 0;
	for (let stock of stocks) {
		totalInvested = stock.price * stock.quantity!;
		stock.totalInvested = +totalInvested.toFixed(2);
	}

	return user;
};

export const calculateUserBalances = (user: IUser) => {
	const { stocks } = user;

	let investedBalance = 0;
	for (let stock of stocks) investedBalance += stock.totalInvested!;
	user.investedBalance = +investedBalance.toFixed(2);

	let totalBalance = 0;
	totalBalance = user.investedBalance + user.availableBalance;
	user.totalBalance = +totalBalance.toFixed(2);

	return user;
};

export const calculateUserStocksPercentagesOfThePortfolio = (user: IUser) => {
	const { stocks } = user;

	for (let stock of stocks) {
		stock.percentageOfThePortfolio =
			Math.round(
				((stock.totalInvested! * 100) / user.investedBalance) * 100
			) / 100;
	}

	return user;
};

export const calculateUserStocksIdealsAndAdjustments = (user: IUser) => {
	const allUserStocksNotesSummed = user.stocks.reduce(
		(accumulator, stock) => accumulator + (stock.note as any),
		0
	);

	for (let stock of user.stocks) {
		let idealPercentageOfThePortfolio =
			stock.note! / allUserStocksNotesSummed;
		stock.idealPercentageOfThePortfolio =
			Math.round(idealPercentageOfThePortfolio * 100 * 100) / 100;

		let idealTotalInvested =
			(stock.idealPercentageOfThePortfolio / 100) * user.totalBalance;
		stock.idealTotalInvested = +idealTotalInvested.toFixed(2);

		let idealQuantity = stock.idealTotalInvested / stock.price;
		stock.idealQuantity! = Math.round(idealQuantity);

		let quantityAdjustment = stock.idealQuantity - stock.quantity!;
		stock.quantityAdjustment = +quantityAdjustment.toFixed(2);

		let totalInvestedAdjustment =
			stock.idealTotalInvested - stock.totalInvested!;
		stock.totalInvestedAdjustment = +totalInvestedAdjustment.toFixed(2);

		let status: 'Wait' | 'Buy' =
			idealQuantity > stock.quantity! ? 'Buy' : 'Wait';
		stock.status = status;
	}

	return user;
};

export const addUserStock = async (
	withCost: boolean,
	user: IUser,
	symbol: string,
	quantity: number,
	note?: number
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
				totalInvested: +(quantity * price).toFixed(2),
				note,
			});
		}

		await user.save();

		await user.calculateInvestedBalance();
		await user.calculatePercentageOfThePortfolioOfEachStock();

		return user;
	} catch (err) {
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
			console.log('updating stocks data');

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
