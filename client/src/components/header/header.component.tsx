import * as React from 'react';

import { Container } from './header.styles';

import { default as BalanceInfo } from '../balance-info/balance-info.container';
import { default as StockPurchase } from '../stock-purchase/stock-purchase.container';

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
