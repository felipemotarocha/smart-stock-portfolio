import AddStockResolver from "./user/add-stock.resolvers";
import ChangeAvailableBalance from "./user/change-available-balance.resolvers";
import ChangeStockNote from "./user/change-stock-note";
import LoginResolver from "./user/login.resolvers";
import RegisterResolver from "./user/register.resolvers";
import StockResolver from "./user/stock.resolvers";
import UserResolver from "./user/user.resolvers";
import UsersResolvers from "./user/users.resolvers";

const resolvers: any = [UserResolver, RegisterResolver, LoginResolver, StockResolver, AddStockResolver, ChangeAvailableBalance, ChangeStockNote, UserResolver, UsersResolvers]

export default resolvers;