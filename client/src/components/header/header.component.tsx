import * as React from 'react';

import { Container } from './header.styles';

import { default as BalanceInfo } from '../balance-info/balance-info.container';
import StockPurchase from '../stock-purchase/stock-purchase.component';

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
	return (
		<Container>
			<StockPurchase />
			<BalanceInfo />
		</Container>
	);
};

export default Header;
