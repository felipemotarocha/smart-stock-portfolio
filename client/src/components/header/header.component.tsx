import * as React from 'react';
import { Button, Input } from 'antd';
import { InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Container, Headline, InputsContainer } from './header.styles';

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
	return (
		<Container>
			<Headline>My Wallet</Headline>
			<InputsContainer>
				<Input size='large' placeholder='Add the purchase of a stock' />
				<InputNumber
					size='large'
					min={1}
					max={999999}
					placeholder='Quantity'
				/>
				<Button size='large' type='primary' icon={<PlusOutlined />} />
			</InputsContainer>
		</Container>
	);
};

export default Header;
