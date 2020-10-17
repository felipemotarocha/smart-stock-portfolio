import * as React from 'react';
import { useState, useContext } from 'react';
import { Button, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useMutation } from '@apollo/client';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

import {
	CustomInput,
	CustomNumberInput,
} from '../custom-input/custom-input.component';

import {
	Container,
	Field,
	Fields,
	GlobalStyle,
	Title,
} from './add-stock.styles';
import { ADD_NEW_USER_STOCK } from '../../graphql/mutations/server-mutations';
import { UserContext } from '../../contexts/user.context';

export interface AddStockProps {}

const AddStock: React.FunctionComponent<AddStockProps> = () => {
	const [symbol, setSymbol] = useState<string>('');
	const [quantity, setQuantity] = useState<number>(1);
	const [note, setNote] = useState<number>(1);
	const [visible, setVisible] = useState(false);

	const { currentUser, updateCurrentUser } = useContext(UserContext);
	const [addNewUserStock] = useMutation(ADD_NEW_USER_STOCK, {
		variables: {
			userId: currentUser?.id,
			symbol,
			quantity,
			note,
		},
		onCompleted: ({ addNewUserStock: user }) => {
			updateCurrentUser(user);
			setSymbol('');
			setQuantity(1);
			setNote(1);
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

	const handleNoteChange = (value: string | number | undefined) => {
		setNote(value as any);
	};

	const handleOpenModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
		setSymbol('');
		setQuantity(1);
		setNote(1);
	};

	return (
		<>
			<GlobalStyle />
			<Button
				type='primary'
				size='large'
				onClick={handleOpenModal}
				icon={<PlusOutlined />}
			>
				New
			</Button>
			<Container>
				<Modal
					title='Add a new stock with no cost (will not affect your available balance)'
					centered
					visible={visible}
					onOk={handleEnterPress}
					onCancel={handleCancel}
					className='modal'
					closable={false}
					width='820px'
					okButtonProps={{ icon: <CheckOutlined />, size: 'large' }}
					cancelButtonProps={{
						icon: <CloseOutlined />,
						size: 'large',
					}}
				>
					<Fields>
						<Field>
							<Title>Symbol</Title>
							<CustomInput
								value={symbol}
								onChange={handleSymbolChange}
								placeholder='ABCD4'
								onPressEnter={handleEnterPress}
							/>
						</Field>
						<Field>
							<Title>Quantity</Title>
							<CustomNumberInput
								size='large'
								width='100%'
								min={0}
								value={quantity}
								onChange={handleQuantityChange}
								onPressEnter={handleEnterPress}
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
								onChange={handleNoteChange}
								onPressEnter={handleEnterPress}
							/>
						</Field>
					</Fields>
				</Modal>
			</Container>
		</>
	);
};

export default AddStock;
