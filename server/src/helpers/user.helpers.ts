import { StockData } from './../graphql/types/stock.types';
import axios from 'axios';
import { differenceInMinutes, getHours, isSaturday, isSunday } from 'date-fns';
import jwt from 'jsonwebtoken';

import { IUser } from './../models/user.model';

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
		if (user.investedBalance === 0 || stock.totalInvested! === 0) {
			stock.percentageOfThePortfolio = 0;
			return;
		}

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
		stock['idealPercentageOfThePortfolio'] =
			Math.round(idealPercentageOfThePortfolio * 100 * 100) / 100;

		let idealTotalInvested =
			(stock.idealPercentageOfThePortfolio / 100) * user.totalBalance;
		stock['idealTotalInvested'] = +idealTotalInvested.toFixed(2);

		let idealQuantity = stock.idealTotalInvested / stock.price;
		stock['idealQuantity']! = Math.round(idealQuantity);

		let quantityAdjustment = stock.idealQuantity - stock.quantity!;
		stock['quantityAdjustment'] = +quantityAdjustment.toFixed(2);

		let totalInvestedAdjustment =
			stock.idealTotalInvested - stock.totalInvested!;
		stock['totalInvestedAdjustment'] = +totalInvestedAdjustment.toFixed(2);

		let status: 'Wait' | 'Buy' =
			stock['quantityAdjustment'] > 0 ? 'Buy' : 'Wait';
		stock['status'] = status;
	}

	return user;
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

			calculateUserStocksPercentagesOfThePortfolio(user);
			await user.save();
		}
	}
	return;
};

export const generateAuthToken = (user: IUser) => {
	return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!);
};
