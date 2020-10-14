import * as React from 'react';

import Wallet from '../../components/wallet/wallet.component';
import { default as Stocks } from '../../components/stocks/stocks.container';
import { UserContext } from '../../contexts/user.context';

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
	const { checkUserSession } = React.useContext(UserContext);
	React.useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);
	return (
		<>
			<Wallet />
			<Stocks />
		</>
	);
};

export default HomePage;
