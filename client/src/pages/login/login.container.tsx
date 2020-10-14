import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useState } from 'react';

import { LOGIN_USER } from '../../graphql/mutations/server-mutations';

import LoginPage from './login.page';

export interface LoginContainerProps {}

const LoginContainer: React.FunctionComponent<LoginContainerProps> = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginUser, { data }] = useMutation(LOGIN_USER);

	React.useEffect(() => {
		console.log(data);
	}, [data]);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = () => {
		loginUser({ variables: { email, password } });
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
