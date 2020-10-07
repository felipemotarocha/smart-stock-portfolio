import * as React from 'react';

import { Container, Item } from './stock-item-column.styles';

export interface StockItemColumnProps {
	headlineText: string;
}

const StockItemColumn: React.FunctionComponent<StockItemColumnProps> = ({
	headlineText,
}) => {
	return (
		<Container>
			<Item headline={true}>{headlineText}</Item>
			<Item>0</Item>
			<Item>$0</Item>
			<Item>0%</Item>
		</Container>
	);
};

export default StockItemColumn;
