import * as React from 'react';
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_USER_STOCK } from '../../graphql/mutations/server-mutations';
import { UserContext } from '../../contexts/user.context';

import StockPurchase from './stock-purchase.component';
import { message } from 'antd';

export interface StockPurchaseContainerProps {}

const StockPurchaseContainer: React.FunctionComponent<StockPurchaseContainerProps> = () => {
	const [symbol, setSymbol] = useState('');
	const [quantity, setQuantity] = useState(1);

	const { currentUser, updateCurrentUser } = useContext(UserContext);
	const [addUserStock] = useMutation(ADD_USER_STOCK, {
		onCompleted: ({ addUserStock: user }) => updateCurrentUser(user),
		onError: (error) => message.error(error.message, 2.5),
	});

	const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSymbol(e.target.value.trim());
	};

	const handleQuantityChange = (value: string | number | undefined) => {
		setQuantity(value as number);
	};

	const handleSubmit = () => {
		if (symbol)
			return addUserStock({
				variables: {
					userId: currentUser?.id,
					withCost: true,
					symbol,
					quantity,
				},
			});
	};

	return (
		<StockPurchase
			symbol={symbol}
			quantity={quantity}
			handleSymbolChange={handleSymbolChange}
			handleQuantityChange={handleQuantityChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export default StockPurchaseContainer;
