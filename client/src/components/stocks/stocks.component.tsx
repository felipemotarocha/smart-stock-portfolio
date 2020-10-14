import * as React from 'react';
import { useContext } from 'react';

import { UserContext } from '../../contexts/user.context';
import { Container, Content, Headline } from './stocks.styles';

import StockItem from '../stock-item/stock-item.component';

const Stocks: React.FunctionComponent = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<Container>
			<Headline>Stocks</Headline>
			<Content>
				{currentUser
					? currentUser!.stocks.map((stock) => (
							<StockItem key={stock.id} stock={stock} />
					  ))
					: null}
			</Content>
		</Container>
	);
};

export default Stocks;
