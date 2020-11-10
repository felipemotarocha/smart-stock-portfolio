import AddNewUserStockResolver from "./user/add-new-user-stock.resolvers";
import LoginWithGoogleResolver from "./user/login-with-google.resolvers";
import LoginWithCredentialsResolver from "./user/login-with-credentials.resolvers";
import ChangeUserAvailableBalanceResolver from "./user/change-user-available-balance.resolvers";
import DeleteUserStockResolver from "./user/delete-user-stock.resolvers";
import EditUserStockResolver from "./user/edit-user-stock.resolvers";
import MeResolver from "./user/me.resolvers";
import RegisterResolver from "./user/register.resolvers";
import StockResolver from "./user/stock.resolvers";
import StocksResolver from "./user/stocks.resolvers";
import UserResolver from "./user/user.resolvers";
import UsersResolvers from "./user/users.resolvers";
import AddExistingUserStockResolver from "./user/add-existing-user-stock.resolvers";
import RegisterGuestResolver from "./user/register-guest.resolvers";
import DeleteGuestUserResolver from "./user/delete-guest-user.resolvers";

const resolvers: any = [
	UserResolver,
	RegisterResolver,
	RegisterGuestResolver,
	LoginWithCredentialsResolver,
	LoginWithGoogleResolver,
	StockResolver,
	StocksResolver,
	AddNewUserStockResolver,
	AddExistingUserStockResolver,
	EditUserStockResolver,
	DeleteUserStockResolver,
	ChangeUserAvailableBalanceResolver,
	UserResolver,
	UsersResolvers,
	MeResolver,
	DeleteGuestUserResolver,
];

export default resolvers;
