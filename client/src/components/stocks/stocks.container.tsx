import { useQuery } from '@apollo/client';
import * as React from 'react';
import { GET_USER_STOCKS } from '../../graphql/queries/server-queries';
import Stocks from './stocks.component';

export interface StocksContainerProps {}

export type UserStocks = {
	user: {
		id: string;
	};
	stocks: {
		id: string;
		name: string;
		symbol: string;
		price: number;
		marketCap: number;
		changePercent: number;
		updatedAt: Date;
		quantity: number;
		totalInvested: number;
		percentageOfThePortfolio: number;
	}[];
};

const StocksContainer: React.FunctionComponent<StocksContainerProps> = () => {
	const { loading, data } = useQuery(GET_USER_STOCKS);

	if (loading) return <p>Loading...</p>;

	const { user } = data;
	return <Stocks userStocks={user} />;
};

export default StocksContainer;
