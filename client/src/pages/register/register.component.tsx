import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { Button, message } from 'antd';

import { Container, Content } from './register.styles';

import { CustomInput } from '../../components/custom-input/custom-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

export interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { register, currentUser } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (currentUser) history.push('/');
	}, [currentUser, history]);

	const handleSubmit = () => {
		if (!name || !email || !password) {
			message.info('Please fill out all the inputs.');
			return;
		}
		if (password.length < 6) {
			message.info('The password must contain at least 6 characters.');
			return;
		}
		register(name, email, password);
	};

	return (
		<Container>
			<Content>
				<h1>
					Register to create your portfolio. We will help you to
					rebalance it.
				</h1>
				<CustomInput
					placeholder='Name'
					type='primary'
					onChange={({ target: { value } }) => setName(value)}
				/>
				<CustomInput
					placeholder='E-mail'
					type='primary'
					onChange={({ target: { value } }) => setEmail(value)}
				/>
				<CustomInput
					type='password'
					placeholder='Password'
					onChange={({ target: { value } }) => setPassword(value)}
				/>
				<Button type='primary' onClick={handleSubmit}>
					Register
				</Button>
				<CustomButton
					type='primary'
					outlined
					onClick={() => history.push('/login')}
				>
					I already have an account
				</CustomButton>
			</Content>
		</Container>
	);
};

export default RegisterPage;
