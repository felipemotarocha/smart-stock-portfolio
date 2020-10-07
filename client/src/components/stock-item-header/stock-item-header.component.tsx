import * as React from 'react';
import {
	Container,
	Info,
	Value,
	Symbol,
	Name,
	Price,
	ChangePercent,
} from './stock-item-header.styles';

export interface StockItemHeaderProps {
	symbol: string;
	name: string;
	price: number;
	changePercent: number;
}

const StockItemHeader: React.FunctionComponent<StockItemHeaderProps> = ({
	symbol,
	name,
	price,
	changePercent,
}) => {
	return (
		<Container>
			<Info>
				<Symbol>{symbol}</Symbol>
				<Name>{name}</Name>
			</Info>
			<Value>
				<Price>R${price}</Price>
				<ChangePercent isPositive={changePercent >= 0}>
					{changePercent >= 0 ? `+${changePercent}` : changePercent}%
				</ChangePercent>
			</Value>
		</Container>
	);
};

export default StockItemHeader;
