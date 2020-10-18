import { useMutation } from '@apollo/client';
import { message } from 'antd';
import * as React from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { ADD_NEW_USER_STOCK } from '../../graphql/mutations/server-mutations';
import AddStock from './add-stock.component';

export interface AddStockContainerProps {}

const AddStockContainer: React.FunctionComponent<AddStockContainerProps> = () => {
	const [symbol, setSymbol] = useState<string>('');
	const [quantity, setQuantity] = useState<number>(1);
	const [score, setScore] = useState<number>(1);
	const [visible, setVisible] = useState(false);

	const { currentUser, updateCurrentUser } = useContext(UserContext);
	const [addNewUserStock] = useMutation(ADD_NEW_USER_STOCK, {
		variables: {
			userId: currentUser?.id,
			symbol,
			quantity,
			score,
		},
		onCompleted: ({ addNewUserStock: user }) => {
			updateCurrentUser(user);
			setSymbol('');
			setQuantity(1);
			setScore(1);
			setVisible(false);
			message.success('The stock was successfully added.');
		},
		onError: (error) => message.error(error.message),
	});

	const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSymbol(e.target.value);
	};

	const handleEnterPress = () => {
		addNewUserStock();
	};

	const handleQuantityChange = (value: string | number | undefined) => {
		setQuantity(value as any);
	};

	const handleScoreChange = (value: string | number | undefined) => {
		setScore(value as any);
	};

	const handleOpenModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
		setSymbol('');
		setQuantity(1);
		setScore(1);
	};

	return (
		<AddStock
			symbol={symbol}
			quantity={quantity}
			score={score}
			visible={visible}
			handleSymbolChange={handleSymbolChange}
			handleQuantityChange={handleQuantityChange}
			handleScoreChange={handleScoreChange}
			handleEnterPress={handleEnterPress}
			handleOpenModal={handleOpenModal}
			handleCancel={handleCancel}
		/>
	);
};

export default AddStockContainer;
