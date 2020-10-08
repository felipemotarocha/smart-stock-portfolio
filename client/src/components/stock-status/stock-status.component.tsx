import * as React from 'react';

import { Stock } from '../../helpers/types/stock.types';
import { Container, Status } from './stock-status.styles';

export interface StockStatusProps {
	stock: Stock;
}

const StockStatus: React.FunctionComponent<StockStatusProps> = ({ stock }) => {
	const { status } = stock;
	return (
		<Container>
			<p>Status</p>
			<Status status={status}>{status}</Status>
		</Container>
	);
};

export default StockStatus;
