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
	async user(@Arg('id') id: string) {
		const user = await User.findById(id);
		return user;
	}

	@Query(() => [UserType])
	async users() {
		const users = await User.find({});
		return users;
	}

	@FieldResolver()
	async stocks(@Root() user: any) {
		console.log(user._id);
		const stocks = await StockModel.find({
			'buyers.buyerId': user._id,
		});
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
	async addNewStock(
		@Arg('userId') userId: string,
		@Arg('symbol') symbol: string
	) {
		const stock = await StockModel.findOne({ symbol });
		const user = await User.findOne({ _id: userId });
		user!.stocks.push({ stockId: stock!._id, quantity: 0 });

		await user?.save();

		return user;
	}
}

export default UserResolver;
