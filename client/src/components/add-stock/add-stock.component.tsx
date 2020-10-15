import * as React from 'react';
import { useState, useContext } from 'react';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Container,
	Field,
	Fields,
	GlobalStyle,
	Title,
} from './add-stock.styles';
import './styles.css';
import {
	CustomInput,
	CustomNumberInput,
} from '../custom-input/custom-input.component';
import { useMutation } from '@apollo/client';
import { ADD_USER_STOCK } from '../../graphql/mutations/server-mutations';
import { UserContext } from '../../contexts/user.context';

export interface AddStockProps {}

const AddStock: React.FunctionComponent<AddStockProps> = () => {
	const [visible, setVisible] = useState(false);
	const [symbol, setSymbol] = useState<string>('');
	const [quantity, setQuantity] = useState<number>(1);
	const [note, setNote] = useState<number>(1);

	const { currentUser, updateCurrentUser } = useContext(UserContext);
	const [addUserStock] = useMutation(ADD_USER_STOCK, {
		variables: {
			userId: currentUser?.id,
			withCost: false,
			symbol,
			quantity,
			note,
		},
		onCompleted: ({ addUserStock: user }) => updateCurrentUser(user),
	});

	const handleOk = (e: any) => {
		addUserStock();
		setSymbol('');
		setQuantity(1);
		setNote(1);
		setVisible(false);
	};

	const handleCancel = () => {
		setSymbol('');
		setQuantity(1);
		setNote(1);
		setVisible(false);
	};

	return (
		<>
			<GlobalStyle />
			<Button
				type='primary'
				size='large'
				onClick={() => setVisible(true)}
				icon={<PlusOutlined />}
			/>
			<Container>
				<Modal
					title='Add a new stock with no cost (will not affect your available balance)'
					centered
					visible={visible}
					onOk={handleOk}
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
								onChange={({ target: { value } }) =>
									setSymbol(value)
								}
								placeholder='ABCD4'
							/>
						</Field>
						<Field>
							<Title>Quantity</Title>
							<CustomNumberInput
								size='large'
								width='100%'
								min={0}
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
				</Modal>
			</Container>
		</>
	);
};

export default AddStock;
