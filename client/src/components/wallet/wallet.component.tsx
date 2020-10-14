import * as React from 'react';
import { useContext } from 'react';
import { Button } from 'antd';

import {
	Buttons,
	Container,
	Content,
	Headline,
	ButtonsContent,
} from './wallet.styles';

import Header from '../wallet-header/wallet-header.component';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';

export interface WalletProps {}

const Wallet: React.FunctionComponent<WalletProps> = () => {
	const { currentUser, logout } = useContext(UserContext);
	const { push } = useHistory();

	return (
		<Container>
			<Content>
				<Headline>My Wallet</Headline>
				<Buttons>
					{currentUser ? (
						<ButtonsContent>
							<p>{currentUser.name}</p>
							<Button type='primary' onClick={logout}>
								Logout
							</Button>
						</ButtonsContent>
					) : (
						<ButtonsContent>
							{' '}
							<Button
								type='primary'
								onClick={() => push('/login')}
							>
								Login
							</Button>
							<Button
								type='link'
								onClick={() => push('/register')}
							>
								Register
							</Button>
						</ButtonsContent>
					)}
				</Buttons>
			</Content>
			<Header />
		</Container>
	);
};

export default Wallet;
