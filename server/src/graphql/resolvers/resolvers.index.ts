import AddUserStockResolver from './user/add-user-stock.resolvers';
import LoginWithGoogleResolver from './user/login-with-google.resolvers';
import LoginWithCredentialsResolver from './user/login-with-credentials.resolvers';
import ChangeUserAvailableBalanceResolver from './user/change-user-available-balance.resolvers';
import DeleteUserStockResolver from './user/delete-user-stock.resolvers';
import EditUserStockResolver from './user/edit-user-stock.resolvers';
import MeResolver from './user/me.resolvers';
import RegisterResolver from './user/register.resolvers';
import StockResolver from './user/stock.resolvers';
import StocksResolver from './user/stocks.resolvers';
import UserResolver from './user/user.resolvers';
import UsersResolvers from './user/users.resolvers';

const resolvers: any = [
	UserResolver,
	RegisterResolver,
	LoginWithCredentialsResolver,
	LoginWithGoogleResolver,
	StockResolver,
	StocksResolver,
	AddUserStockResolver,
	EditUserStockResolver,
	DeleteUserStockResolver,
	ChangeUserAvailableBalanceResolver,
	UserResolver,
	UsersResolvers,
	MeResolver,
];

export default resolvers;
