import * as React from 'react';

import Wallet from '../../components/wallet/wallet.component';
import Stocks from '../../components/stocks/stocks.component';

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
