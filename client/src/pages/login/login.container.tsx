import * as React from 'react';
import { useState, useContext } from 'react';

import { UserContext } from '../../contexts/user.context';

import LoginPage from './login.page';

export interface LoginContainerProps {}

const LoginContainer: React.FunctionComponent<LoginContainerProps> = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useContext(UserContext);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = () => {
		login(email, password);
	};

	return (
		<LoginPage
			handleEmailChange={handleEmailChange}
			handlePasswordChange={handlePasswordChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export default LoginContainer;
