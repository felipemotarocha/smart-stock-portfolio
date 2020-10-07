import * as React from 'react';

import { Columns, ColumnsInfo, Container } from './stock-item-content.styles';
import { Stock } from '../../helpers/types/stock.types';

import StockItemColumn from '../stock-item-content-column/stock-item-content-column.component';

export interface StockItemContentProps {
	stock: Stock;
}

const StockItemContent: React.FunctionComponent<StockItemContentProps> = ({
	stock,
}) => {
	return (
		<Container>
			<ColumnsInfo>
				<p>Qnt.</p>
				<p>Pos.</p>
				<p>%</p>
			</ColumnsInfo>
			<Columns>
				<StockItemColumn
					headlineText='Current'
					contentType='current'
					stock={stock}
				/>
				<StockItemColumn
					headlineText='Ideal'
					contentType='ideal'
					stock={stock}
				/>
				<StockItemColumn
					headlineText='Adjustment'
					contentType='adjustment'
					stock={stock}
				/>
			</Columns>
		</Container>
	);
};

export default StockItemContent;
