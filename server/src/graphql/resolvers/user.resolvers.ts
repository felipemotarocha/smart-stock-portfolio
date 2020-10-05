import { IUser } from './../../models/user.model';
import {
	Resolver,
	Query,
	Mutation,
	Arg,
	FieldResolver,
	Root,
} from 'type-graphql';
import User, { IRegisterUserInput } from '../../models/user.model';
import { default as StockModel } from '../../models/stock.model';
import bcrypt from 'bcryptjs';
import { default as UserType } from '../types/user.types';
import { ApolloError } from 'apollo-server-express';

@Resolver((_of) => UserType)
class UserResolver {
	@Query(() => UserType)
	async user(@Arg('_id') _id: string) {
		try {
			const user = await User.findById(_id);
			return user;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@Query(() => [UserType])
	async users() {
		try {
			const users = await User.find({});
			return users;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@FieldResolver()
	async stocks(@Root() user: IUser) {
		try {
			const stocks = await StockModel.find({
				'buyers.buyerId': user._id,
			});

			// adding the quantity and the total invested field to each stock
			for (let stock of stocks) {
				user.stocks.forEach((userStock) => {
					if (userStock.stockId.toString() === stock._id.toString()) {
						stock.quantity = userStock.quantity;
						stock.totalInvested = stock.quantity * stock.price;
					}
				});
			}

			// updating the user's total invested balance according to the total invested in each stock
			user.investedBalance = stocks.reduce(
				(accumulator, currentStock) =>
					accumulator + currentStock.totalInvested!,
				0
			);
			await user.save();

			// calculating the percentage of each stock in the portfolio
			for (let stock of stocks) {
				stock.percentageOfThePortfolio =
					Math.round(
						((stock.totalInvested! * 100) / user.investedBalance) *
							100
					) / 100;
			}

			return stocks;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@Mutation(() => UserType)
	async register(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<IRegisterUserInput | ApolloError> {
		try {
			const hashedPassword = await bcrypt.hash(password, 8);

			const user = new User({ name, email, password: hashedPassword });
			await user.save();

			return user;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@Mutation(() => UserType)
	async addStockWithNoCost(
		@Arg('userId') userId: string,
		@Arg('symbol') symbol: string,
		@Arg('quantity') quantity: number
	) {
		try {
			const stock = await StockModel.findOne({ symbol });
			const user = await User.findOne({ _id: userId });

			stock!.buyers.push({ buyerId: user!._id });
			user!.stocks.push({ stockId: stock!._id, quantity });

			await stock!.save();
			await user!.save();

			return user;
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}

	@Mutation(() => UserType)
	async addStockWithCost(
		@Arg('userId') userId: string,
		@Arg('symbol') symbol: string,
		@Arg('quantity') quantity: number
	) {
		try {
			const stock = await StockModel.findOne({ symbol });
			const user = await User.findOne({ _id: userId })!;

			const { price } = stock!;

			// checking if the user has enough balance to buy the stock
			if (user && stock && user!.availableBalance >= price * quantity) {
				user.availableBalance =
					user.availableBalance - price * quantity;

				user.investedBalance += price * quantity;

				// check if the user already has the stock
				const userAlreadyHasTheStock = user.stocks.findIndex(
					(userStock) => userStock.stockId.toString() == stock._id
				);
				// if he has, add to the quantity, if he not, add to the his stocks list
				if (userAlreadyHasTheStock !== -1) {
					user.stocks[userAlreadyHasTheStock].quantity += quantity;
				} else {
					user.stocks.push({ stockId: stock._id, quantity });
					stock.buyers.push({ buyerId: user._id });
				}

				await user.save();
				await stock.save();

				return user;
			}

			return new ApolloError(
				'You do not have enough balance to make this transaction.'
			);
		} catch (_err) {
			return new ApolloError('Something went wrong.');
		}
	}
}

export default UserResolver;
