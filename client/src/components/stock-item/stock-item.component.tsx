import * as React from 'react';
import StockItemHeader from '../stock-item-header/stock-item-header.component';

import { Container } from './stock-item.styles';

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
		</Container>
	);
};

export default StockItem;
