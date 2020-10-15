import * as React from 'react';
import { useState, useContext } from 'react';
import { Button } from 'antd';
import { CloseOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import { Buttons, Container, Field, Fields, Title } from './stock-edit.styles';
import { Stock } from '../../helpers/types/stock.types';
import {
	DELETE_USER_STOCK,
	EDIT_USER_STOCK,
} from '../../graphql/mutations/server-mutations';
import { UserContext } from '../../contexts/user.context';

import {
	CustomInput,
	CustomNumberInput,
} from '../custom-input/custom-input.component';

export interface StockEditProps {
	stock: Stock;
}

const StockEdit: React.FunctionComponent<StockEditProps> = ({ stock }) => {
	const [symbol] = useState<string>(stock.symbol);
	const [quantity, setQuantity] = useState<number>(stock.quantity);
	const [note, setNote] = useState<number>(stock.note);

	const { currentUser, updateCurrentUser } = useContext(UserContext);
	const [editUserStock] = useMutation(EDIT_USER_STOCK, {
		variables: {
			userId: currentUser?.id,
			stockId: stock.id,
			note,
			quantity,
		},
		onCompleted: ({ editUserStock: user }) => updateCurrentUser(user),
	});
	const [deleteUserStock] = useMutation(DELETE_USER_STOCK, {
		variables: { userId: currentUser?.id, stockId: stock.id },
		onCompleted: ({ deleteUserStock: user }) => updateCurrentUser(user),
	});

	const resetInputs = () => {
		const { quantity, note } = stock;
		setQuantity(quantity);
		setNote(note);
	};

	return (
		<Container>
			<Fields>
				<Field>
					<Title>Symbol</Title>
					<CustomInput readOnly value={symbol} />
				</Field>
				<Field>
					<Title>Quantity</Title>
					<CustomNumberInput
						size='large'
						width='100%'
						value={quantity}
						onChange={(value) => setQuantity(value as any)}
					/>
				</Field>
				<Field>
					<Title>Note</Title>
					<CustomNumberInput
						size='large'
						width='100%'
						min={1}
						max={10}
						value={note}
						onChange={(value) => setNote(value as any)}
					/>
				</Field>
			</Fields>
			<Buttons>
				<Button
					type='primary'
					size='large'
					icon={<SaveOutlined />}
					onClick={() => editUserStock()}
				>
					Save
				</Button>
				<Button
					type='default'
					size='large'
					icon={<CloseOutlined />}
					onClick={resetInputs}
				>
					Discard changes
				</Button>
				<Button
					type='default'
					size='large'
					icon={<DeleteOutlined />}
					onClick={() => deleteUserStock()}
				>
					Delete
				</Button>
			</Buttons>
		</Container>
	);
};

export default StockEdit;
