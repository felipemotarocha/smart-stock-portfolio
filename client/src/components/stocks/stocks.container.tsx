import { useQuery } from '@apollo/client';
import * as React from 'react';

import { GET_USER_STOCKS } from '../../graphql/queries/server-queries';
import { Stock } from '../../helpers/types/stock.types';

import Stocks from './stocks.component';

export interface StocksContainerProps {}

export type UserStocks = {
	user: {
		id: string;
	};
	stocks: Stock[];
};

const StocksContainer: React.FunctionComponent<StocksContainerProps> = () => {
	const { loading, data } = useQuery(GET_USER_STOCKS);

	if (loading) return <p>Loading...</p>;

	const { user } = data;
	return <Stocks userStocks={user} />;
};

export default StocksContainer;
