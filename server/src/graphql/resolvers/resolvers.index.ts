import AddUserStockResolver from './user/add-user-stock.resolvers';
import ChangeUserAvailableBalanceResolver from './user/change-user-available-balance.resolvers';
import DeleteUserStockResolver from './user/delete-user-stock.resolvers';
import EditUserStockResolver from './user/edit-user-stock.resolvers';
import LoginResolver from './user/login.resolvers';
import MeResolver from './user/me.resolvers';
import RegisterResolver from './user/register.resolvers';
import StockResolver from './user/stock.resolvers';
import UserResolver from './user/user.resolvers';
import UsersResolvers from './user/users.resolvers';

const resolvers: any = [
	UserResolver,
	RegisterResolver,
	LoginResolver,
	StockResolver,
	AddUserStockResolver,
	EditUserStockResolver,
	DeleteUserStockResolver,
	ChangeUserAvailableBalanceResolver,
	UserResolver,
	UsersResolvers,
	MeResolver,
];

export default resolvers;
