import * as React from 'react';

import { Container, Headline } from './wallet.styles';

import Header from '../header/header.component';

export interface WalletProps {}

const Wallet: React.FunctionComponent<WalletProps> = () => {
	return (
		<Container>
			<Headline>My Wallet</Headline>
			<Header />
		</Container>
	);
};

export default Wallet;
