import axios from 'axios';
import { ApolloError } from 'apollo-server-express';

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

		user.investedBalance += price * quantity;
		if (withCost) user.availableBalance -= price * quantity;

		const userAlreadyHasTheStock = user.stocks.findIndex(
			(stock) => stock.symbol === symbol.toUpperCase()
		);
		if (userAlreadyHasTheStock !== -1) {
			user.stocks[userAlreadyHasTheStock].quantity! += quantity;
			user.stocks[userAlreadyHasTheStock].totalInvested =
				user.stocks[userAlreadyHasTheStock].quantity! * price;
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

		calculatePercentageOfThePortfolio(user);

		await user.save();
		return user;
	} catch (err) {
		return new ApolloError('Something went wrong.');
	}
};

export const calculatePercentageOfThePortfolio = (user: IUser) => {
	for (let stock of user.stocks) {
		stock.percentageOfThePortfolio =
			Math.round(
				((stock.totalInvested! * 100) / user.investedBalance) * 100
			) / 100;
	}
};
