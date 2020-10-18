import * as React from 'react';
import { useMutation } from '@apollo/client';
import { message } from 'antd';

import { UserContext } from '../../contexts/user.context';
import {
	EDIT_USER_STOCK,
	DELETE_USER_STOCK,
} from '../../graphql/mutations/server-mutations';
import { Stock } from '../../helpers/types/stock.types';

import StockEdit from './stock-edit.component';

export interface StockEditContainerProps {
	stock: Stock;
}

const StockEditContainer: React.FunctionComponent<StockEditContainerProps> = ({
	stock,
}) => {
	const [symbol] = React.useState<string>(stock.symbol);
	const [quantity, setQuantity] = React.useState<number>(stock.quantity);
	const [score, setScore] = React.useState<number>(stock.score);

	const { currentUser, updateCurrentUser } = React.useContext(UserContext);
	const [editUserStock] = useMutation(EDIT_USER_STOCK, {
		variables: {
			userId: currentUser?.id,
			stockId: stock.id,
			score,
			quantity,
		},
		onCompleted: ({ editUserStock: user }) => {
			updateCurrentUser(user);
			message.success('The changes were successfully saved.');
		},
	});
	const [deleteUserStock] = useMutation(DELETE_USER_STOCK, {
		variables: { userId: currentUser?.id, stockId: stock.id },
		onCompleted: ({ deleteUserStock: user }) => updateCurrentUser(user),
	});

	const handleQuantityChange = (value: string | number | undefined) => {
		setQuantity(value as any);
	};

	const handleScoreChange = (value: string | number | undefined) => {
		setScore(value as any);
	};

	const resetInputs = () => {
		const { quantity, score } = stock;
		setQuantity(quantity);
		setScore(score);
	};

	const handleConfirmDelete = () => {
		deleteUserStock();
		message.success('The stock was successfully deleted.');
	};

	const handleSaveChanges = () => {
		editUserStock();
	};

	return (
		<StockEdit
			symbol={symbol}
			quantity={quantity}
			score={score}
			handleQuantityChange={handleQuantityChange}
			handleScoreChange={handleScoreChange}
			handleConfirmDelete={handleConfirmDelete}
			handleSaveChanges={handleSaveChanges}
			resetInputs={resetInputs}
		/>
	);
};

export default StockEditContainer;
