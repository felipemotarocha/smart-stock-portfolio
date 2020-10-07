import * as React from 'react';

import { Container } from './stock-item.styles';

import StockItemContent from '../stock-item-content/stock-item-content.component';
import StockItemHeader from '../stock-item-header/stock-item-header.component';

export interface StockItemProps {
	stock: {
		id: string;
		name: string;
		symbol: string;
		price: number;
		marketCap: number;
		changePercent: number;
		updatedAt: Date;
		quantity: number;
		totalInvested: number;
	};
}

const StockItem: React.FunctionComponent<StockItemProps> = ({
	stock: { name, symbol, price, changePercent },
}) => {
	return (
		<Container>
			<StockItemHeader
				name={name}
				symbol={symbol}
				price={price}
				changePercent={changePercent}
			/>
			<StockItemContent />
		</Container>
	);
};

export default StockItem;
