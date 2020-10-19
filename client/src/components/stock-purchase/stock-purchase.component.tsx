import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FetchResult } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

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
	const isMobile = useMediaQuery({
		query: '(max-device-width: 768px)',
	});

	return (
		<Container>
			{isMobile ? <h2>Add the purchase of a stock</h2> : null}
			<InputsContainer>
				<CustomInput
					type='text'
					size={isMobile ? 'middle' : 'large'}
					placeholder={
						isMobile ? 'Symbol' : 'Add the purchase of a stock'
					}
					width={isMobile ? 'inherit' : '45%'}
					value={symbol}
					onChange={handleSymbolChange}
					onPressEnter={handleSubmit}
				/>
				<CustomNumberInput
					type='number'
					size={isMobile ? ('middle' as any) : ('large' as any)}
					min={1}
					placeholder='Qnt.'
					value={quantity}
					onChange={handleQuantityChange}
					onPressEnter={handleSubmit}
				/>
				<Button
					size={isMobile ? 'middle' : 'large'}
					type='primary'
					icon={<PlusOutlined />}
					onClick={handleSubmit}
				/>
			</InputsContainer>
		</Container>
	);
};

export default StockPurchase;
