import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { Container, InputsContainer } from './stock-purchase.styles';
import CustomInput from '../custom-input/custom-input.component';

export interface StockPurchaseProps {}

const StockPurchase: React.FunctionComponent<StockPurchaseProps> = () => {
	return (
		<Container>
			<InputsContainer>
				<CustomInput
					type='text'
					size='large'
					placeholder='Add the purchase of a stock'
					width='40%'
				/>
				<CustomInput
					type='number'
					size='large'
					min={1}
					max={999999}
					width='15%'
					placeholder='Quantity'
				/>
				<Button size='large' type='primary' icon={<PlusOutlined />} />
			</InputsContainer>
		</Container>
	);
};

export default StockPurchase;
