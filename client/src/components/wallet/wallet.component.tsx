import * as React from 'react';
import { Button } from 'antd';

import { Buttons, Container, Content, Headline } from './wallet.styles';

import Header from '../wallet-header/wallet-header.component';
import { useHistory } from 'react-router-dom';

export interface WalletProps {}

const Wallet: React.FunctionComponent<WalletProps> = () => {
	const { push } = useHistory();

	return (
		<Container>
			<Content>
				<Headline>My Wallet</Headline>
				<Buttons>
					<Button type='primary' onClick={() => push('/login')}>Login</Button>
					<Button type='link' onClick={() => push('/register')}>Register</Button>
				</Buttons>
			</Content>
			<Header />
		</Container>
	);
};

export default Wallet;
