import * as React from 'react';

import { Container } from './wallet.styles';

import Header from '../header/header.component';

export interface WalletProps {}

const Wallet: React.FunctionComponent<WalletProps> = () => {
	return (
		<Container>
			<Header />
		</Container>
	);
};

export default Wallet;
