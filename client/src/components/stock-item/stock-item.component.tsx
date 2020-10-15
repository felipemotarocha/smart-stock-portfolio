import * as React from 'react';

import { Container } from './stock-item.styles';
import { Stock } from '../../helpers/types/stock.types';

import StockItemContent from '../stock-item-content/stock-item-content.component';
import StockItemHeader from '../stock-item-header/stock-item-header.component';
import StockEdit from '../stock-edit/stock-edit.component';

export interface StockItemProps {
	stock: Stock;
	editableStocks: boolean;
}

const StockItem: React.FunctionComponent<StockItemProps> = ({
	stock,
	editableStocks,
}) => {
	return (
		<Container editableStocks={editableStocks}>
			{editableStocks ? (
				<StockEdit stock={stock} />
			) : (
				<>
					<StockItemHeader stock={stock} />
					<StockItemContent stock={stock} />{' '}
				</>
			)}
		</Container>
	);
};

export default StockItem;
