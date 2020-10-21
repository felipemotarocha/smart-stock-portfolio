import * as React from 'react';
import { useContext } from 'react';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { UserContext } from '../../contexts/user.context';
import { Container, Content, Headline } from './stocks.styles';

import StockItem from '../stock-item/stock-item.component';
import { default as AddStock } from '../add-stock/add-stock.container';

const Stocks: React.FunctionComponent = () => {
	const { currentUser, editableStocks, setEditableStocks } = useContext(
		UserContext
	);

	const handleToggleEditableStocks = () => {
		setEditableStocks!(!editableStocks);
	};

	const isMobile = useMediaQuery({
		query: '(max-device-width: 768px)',
	});

	const isIphone5s = useMediaQuery({
		query: '(max-device-width: 320px)',
	});

	return (
		<Container>
			<Headline>
				<p>Stocks</p>
				<AddStock />
				<Button
					size={isMobile ? 'middle' : 'large'}
					type='primary'
					icon={editableStocks ? <CheckOutlined /> : <EditOutlined />}
					onClick={handleToggleEditableStocks}
				>
					{isIphone5s ? null : editableStocks ? 'Done' : 'Edit'}
				</Button>
			</Headline>
			<Content>
				{currentUser
					? currentUser!.stocks.map((stock) => (
							<StockItem
								key={stock._id}
								stock={stock}
								editableStocks={editableStocks}
							/>
					  ))
					: null}
			</Content>
		</Container>
	);
};

export default Stocks;
