import axios from 'axios';
import { StockData } from 'src/graphql/types/stock.types';

const fetchStocksData = async (symbol: string) => {
	const {
		data: { results },
	} = await axios.get(
		`https://api.hgbrasil.com/finance/stock_price?key=${process.env.HG_FINANCE_KEY}&symbol=${symbol}`
	);

	if (results[symbol.toUpperCase()].error)
		throw new Error(
			'You entered an invalid symbol or something else went wrong.'
		);

	return results[symbol.toUpperCase()] as StockData;
};

export default fetchStocksData;
