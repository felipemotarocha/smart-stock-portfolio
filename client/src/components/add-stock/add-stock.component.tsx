import * as React from 'react';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
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

export interface AddStockProps {
	symbol: string;
	quantity: number;
	score: number;
	visible: boolean;
	handleSymbolChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleQuantityChange: (value: string | number | undefined) => void;
	handleScoreChange: (value: string | number | undefined) => void;
	handleEnterPress: () => void;
	handleOpenModal: () => void;
	handleCancel: () => void;
}

const AddStock: React.FunctionComponent<AddStockProps> = ({
	symbol,
	quantity,
	score,
	visible,
	handleSymbolChange,
	handleQuantityChange,
	handleScoreChange,
	handleEnterPress,
	handleOpenModal,
	handleCancel,
}) => {
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
							<Title>Score</Title>
							<CustomNumberInput
								size='large'
								width='100%'
								min={1}
								max={10}
								value={score}
								onChange={handleScoreChange}
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
