import { IUser } from 'src/models/user.model';

const checkIfTheUserAlreadyHasTheStock = (user: IUser, symbol: string) => {
	const checker = user.stocks.findIndex(
		(stock) => stock.symbol === symbol.toUpperCase()
	);

	if (checker !== -1) return true;
	return false;
};

export default checkIfTheUserAlreadyHasTheStock;
