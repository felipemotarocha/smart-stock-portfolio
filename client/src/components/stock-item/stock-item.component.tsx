import * as React from 'react';

import { Container } from './stock-item.styles';
import { Stock } from '../../helpers/types/stock.types';

import StockItemContent from '../stock-item-content/stock-item-content.component';
import StockItemHeader from '../stock-item-header/stock-item-header.component';

export interface StockItemProps {
	stock: Stock;
}

const StockItem: React.FunctionComponent<StockItemProps> = ({ stock }) => {
	return (
		<Container>
			<StockItemHeader stock={stock} />
			<StockItemContent stock={stock} />
		</Container>
	);
};

export default StockItem;
