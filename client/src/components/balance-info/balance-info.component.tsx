import * as React from 'react';
import { SaveOutlined } from '@ant-design/icons';

import { Container, InputContainer, Headline } from './balance-info.styles';

import CustomInput from '../custom-input/custom-input.component';

export interface BalanceInfoProps {
	availableBalanceInput: number;
	availableBalance: number;
	investedBalance: number;
	totalBalance: number;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
}
const BalanceInfo: React.FunctionComponent<BalanceInfoProps> = ({
	availableBalance,
	investedBalance,
	totalBalance,
	handleChange,
	handleSubmit,
	availableBalanceInput,
}) => {
	return (
		<Container>
			<InputContainer>
				<Headline>Available balance</Headline>
				<CustomInput
					width='300px'
					prefix='R$'
					type='text'
					size='large'
					color='primary'
					allowClear
					onChange={handleChange}
					value={availableBalanceInput}
					addonAfter={
						availableBalanceInput !== availableBalance ? (
							<SaveOutlined onClick={handleSubmit} />
						) : null
					}
				/>
			</InputContainer>

			<InputContainer>
				<Headline>Invested balance</Headline>
				<CustomInput
					type='text'
					width='300px'
					prefix='R$'
					size='large'
					backgroundcolor='#1488cc'
					readOnly
					value={investedBalance}
				/>
			</InputContainer>

			<InputContainer>
				<Headline>Total balance</Headline>
				<CustomInput
					width='300px'
					prefix='R$'
					type='text'
					size='large'
					color='primary'
					backgroundcolor='#1488cc'
					readOnly
					value={totalBalance}
				/>
			</InputContainer>
		</Container>
	);
};

export default BalanceInfo;
