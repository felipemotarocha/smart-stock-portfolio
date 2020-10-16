import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { Button } from 'antd';

import { CustomInput } from '../../components/custom-input/custom-input.component';
import { Container, Content } from './login.styles';
import { UserContext } from '../../contexts/user.context';
import { useHistory } from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button.component';

export interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login, currentUser } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (currentUser) history.push('/');
	}, [currentUser, history]);

	return (
		<Container>
			<Content>
				<h1>Login to your account.</h1>
				<CustomInput
					type='email'
					placeholder='E-mail'
					onChange={({ target: { value } }) => setEmail(value)}
				/>
				<CustomInput
					type='password'
					placeholder='Password'
					onChange={({ target: { value } }) => setPassword(value)}
				/>
				<Button type='primary' onClick={() => login(email, password)}>
					Login
				</Button>
				<CustomButton
					type='primary'
					outlined={true}
					onClick={() => history.push('/register')}
				>
					Create an account
				</CustomButton>
			</Content>
		</Container>
	);
};

export default LoginPage;
