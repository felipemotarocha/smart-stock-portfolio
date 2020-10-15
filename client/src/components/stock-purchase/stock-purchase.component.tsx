import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FetchResult } from '@apollo/client';

import { Container, InputsContainer } from './stock-purchase.styles';
import {
	CustomInput,
	CustomNumberInput,
} from '../custom-input/custom-input.component';

export interface StockPurchaseProps {
	symbol: string;
	quantity: number;
	handleSymbolChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleQuantityChange: (value: string | number | undefined) => void;
	handleSubmit: () =>
		| Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
		| undefined;
}

const StockPurchase: React.FunctionComponent<StockPurchaseProps> = ({
	symbol,
	quantity,
	handleSymbolChange,
	handleQuantityChange,
	handleSubmit,
}) => {
	return (
		<Container>
			<InputsContainer>
				<CustomInput
					type='text'
					size='large'
					placeholder='Add the purchase of a stock'
					width='40%'
					value={symbol}
					onChange={(e) => handleSymbolChange(e)}
				/>
				<CustomNumberInput
					type='number'
					size='large'
					min={1}
					max={999999}
					placeholder='Qnt.'
					value={quantity}
					onChange={(value) => handleQuantityChange(value)}
				/>
				<Button
					size='large'
					type='primary'
					icon={<PlusOutlined />}
					onClick={handleSubmit}
				/>
			</InputsContainer>
		</Container>
	);
};

export default StockPurchase;
