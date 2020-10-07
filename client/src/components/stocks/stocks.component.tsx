import * as React from 'react';
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
				<h1>hello</h1>
			</Content>
		</Container>
	);
};

export default Stocks;
