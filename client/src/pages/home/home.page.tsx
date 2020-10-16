import * as React from 'react';

import { Container } from './home.styles';

import Wallet from '../../components/wallet/wallet.component';
import Stocks from '../../components/stocks/stocks.component';

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
	return (
		<Container>
			<Wallet />
			<Stocks />
		</Container>
	);
};

export default HomePage;
