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

@Resolver((_of) => UserType)
class UserResolver {
	@Query(() => UserType)
	async user(@Arg('_id') _id: string) {
		const user = await User.findById(_id);
		return user;
	}

	@Query(() => [UserType])
	async users() {
		const users = await User.find({});
		return users;
	}

	@FieldResolver()
	async stocks(@Root() user: any) {
		const stocks = await StockModel.find({
			'buyers.buyerId': user._id,
		});

		// adding the quantity that the user has of each stock
		for (let stock of stocks) {
			for (const userStock of user.stocks) {
				if (userStock.stockId.toString() == stock._id) {
					stock.quantity = userStock.quantity;
				}
			}
		}

		return stocks;
	}

	@Mutation(() => UserType)
	async register(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<IRegisterUserInput> {
		const hashedPassword = await bcrypt.hash(password, 8);

		const user = new User({ name, email, password: hashedPassword });
		await user.save();

		return user;
	}

	@Mutation(() => UserType)
	async addStockWithNoCost(
		@Arg('userId') userId: string,
		@Arg('symbol') symbol: string,
		@Arg('quantity') quantity: number
	) {
		const stock = await StockModel.findOne({ symbol });
		const user = await User.findOne({ _id: userId });

		stock!.buyers.push({ buyerId: user!._id });
		user!.stocks.push({ stockId: stock!._id, quantity });

		await stock!.save();
		await user!.save();

		return user;
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
			if (user!.availableBalance >= price * quantity) {
				user!.availableBalance =
					user!.availableBalance - price * quantity;

				user!.investedBalance += price * quantity;

				// check if the user already has the stock
				const userAlreadyHasTheStock = user!.stocks.findIndex(
					(userStock) => userStock.stockId.toString() == stock!._id
				);

				// if he has, add to the quantity, if he not, add to the stocks list
				if (userAlreadyHasTheStock !== -1) {
					user!.stocks[userAlreadyHasTheStock].quantity += quantity;
				} else {
					user!.stocks.push({ stockId: stock!._id, quantity });
					stock!.buyers.push({ buyerId: user!._id });
				}

				await user!.save();
				await stock!.save();

				return user;
			} else {
				throw new Error(
					'You do not have enough balance to make this transaction.'
				);
			}
		} catch (err) {
			return err.message;
		}
	}
}

export default UserResolver;
