import * as React from 'react';
import StockItem from '../stock-item/stock-item.component';
import { UserStocks } from './stocks.container';
import { Container, Content, Headline } from './stocks.styles';

export interface StocksProps {
	userStocks: UserStocks;
}

const Stocks: React.FunctionComponent<StocksProps> = ({ userStocks }) => {
	return (
		<Container>
			<Headline>Stocks</Headline>
			<Content>
				{userStocks.stocks.map((stock) => (
					<StockItem key={stock.id} stock={stock} />
				))}
			</Content>
		</Container>
	);
};

export default Stocks;
