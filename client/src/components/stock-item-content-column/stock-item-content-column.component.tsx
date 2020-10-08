import * as React from 'react';
import NumberFormat from 'react-number-format';

import { Stock } from '../../helpers/types/stock.types';
import { Container, Item } from './stock-item-content-column.styles';

export interface StockItemColumnProps {
	headlineText: string;
	contentType: 'current' | 'ideal' | 'adjustment';
	stock: Stock;
}

const StockItemColumn: React.FunctionComponent<StockItemColumnProps> = ({
	headlineText,
	contentType,
	stock,
}) => {
	const {
		quantity,
		totalInvested,
		percentageOfThePortfolio,
		idealQuantity,
		idealTotalInvested,
		idealPercentageOfThePortfolio,
	} = stock;
	return (
		<Container>
			<Item headline={true}>{headlineText}</Item>
			{contentType === 'current' ? (
				<>
					<Item>{quantity}</Item>
					<Item>
						<NumberFormat
							value={totalInvested}
							displayType={'text'}
							thousandSeparator='.'
							decimalSeparator=','
							prefix={'R$'}
						/>
					</Item>
					<Item>{percentageOfThePortfolio}%</Item>
				</>
			) : contentType === 'ideal' ? (
				<>
					<Item>{idealQuantity}</Item>
					<Item>
						<NumberFormat
							value={idealTotalInvested}
							displayType={'text'}
							thousandSeparator='.'
							decimalSeparator=','
							prefix={'R$'}
						/>
					</Item>

					<Item>{idealPercentageOfThePortfolio}%</Item>
				</>
			) : contentType === 'adjustment' ? (
				<>
					<Item>0</Item>
					<Item>$0</Item>
					<Item>0%</Item>
				</>
			) : null}
		</Container>
	);
};

export default StockItemColumn;
