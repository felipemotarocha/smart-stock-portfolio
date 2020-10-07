import * as React from 'react';

import Wallet from '../components/wallet/wallet.component';
import { default as Stocks } from '../components/stocks/stocks.container';

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
	return (
		<>
			<Wallet />
			<Stocks />
		</>
	);
};

export default HomePage;
