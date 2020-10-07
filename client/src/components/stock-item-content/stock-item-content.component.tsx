import * as React from 'react';

import { Columns, ColumnsInfo, Container } from './stock-item-content.styles';

import StockItemColumn from '../stock-item-column/stock-item-column.component';

export interface StockItemContentProps {}

const StockItemContent: React.FunctionComponent<StockItemContentProps> = () => {
	return (
		<Container>
			<ColumnsInfo>
				<p>Qnt.</p>
				<p>Pos.</p>
				<p>%</p>
			</ColumnsInfo>
			<Columns>
				<StockItemColumn headlineText='Atual' />
				<StockItemColumn headlineText='Ideal' />
				<StockItemColumn headlineText='Ajuste' />
			</Columns>
		</Container>
	);
};

export default StockItemContent;
