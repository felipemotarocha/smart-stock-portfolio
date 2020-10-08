import * as React from 'react';
import StockStatus from '../stock-status/stock-status.component';
import {
	Container,
	Info,
	Value,
	Symbol,
	Name,
	Price,
	ChangePercent,
} from './stock-item-header.styles';
import { Stock } from '../../helpers/types/stock.types';

export interface StockItemHeaderProps {
	stock: Stock;
}

const StockItemHeader: React.FunctionComponent<StockItemHeaderProps> = ({
	stock,
}) => {
	const { symbol, name, price, changePercent } = stock;
	return (
		<Container>
			<Info>
				<Symbol>{symbol}</Symbol>
				<Name>{name}</Name>
			</Info>
			<StockStatus stock={stock} />
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
