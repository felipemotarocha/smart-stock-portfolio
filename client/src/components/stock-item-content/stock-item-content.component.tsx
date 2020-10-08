import * as React from 'react';

import {
	Columns,
	ColumnsInfo,
	Container,
	Note,
} from './stock-item-content.styles';
import { Stock } from '../../helpers/types/stock.types';

import StockItemColumn from '../stock-item-content-column/stock-item-content-column.component';

export interface StockItemContentProps {
	stock: Stock;
}

const StockItemContent: React.FunctionComponent<StockItemContentProps> = ({
	stock,
}) => {
	const { note } = stock;
	return (
		<Container>
			<ColumnsInfo>
				<Note>
					<p>{note}</p>
				</Note>
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
