import * as React from 'react';

import {
	Columns,
	ColumnsInfo,
	Container,
	Score,
} from './stock-item-content.styles';
import { Stock } from '../../helpers/types/stock.types';

import StockItemColumn from '../stock-item-content-column/stock-item-content-column.component';

export interface StockItemContentProps {
	stock: Stock;
}

const StockItemContent: React.FunctionComponent<StockItemContentProps> = ({
	stock,
}) => {
	const { score } = stock;
	return (
		<Container>
			<ColumnsInfo>
				<Score>
					<p>Score</p>
					<p>{score}</p>
				</Score>
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
