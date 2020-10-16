import * as React from 'react';
import { useEffect } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';

import { Container, InputContainer, Headline } from './balance-info.styles';

import { CustomInput } from '../custom-input/custom-input.component';

export interface BalanceInfoProps {
	availableBalanceInput: number;
	setAvailableBalanceInput: React.Dispatch<React.SetStateAction<number>>;
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
	setAvailableBalanceInput,
}) => {
	useEffect(() => {
		setAvailableBalanceInput(availableBalance);
	}, [availableBalance, setAvailableBalanceInput]);

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
					autoFocus
					addonAfter={
						availableBalanceInput !== availableBalance ? (
							<SaveOutlined onClick={handleSubmit} />
						) : (
							''
						)
					}
					onPressEnter={() => handleSubmit()}
				/>
			</InputContainer>

			<InputContainer>
				<Headline>Invested balance</Headline>
				<NumberFormat
					value={investedBalance}
					displayType={'text'}
					thousandSeparator='.'
					decimalSeparator=','
					prefix={'R$'}
					renderText={(value) => (
						<CustomInput
							type='text'
							width='300px'
							size='large'
							backgroundcolor='#1488cc'
							readOnly
							value={value}
						/>
					)}
				/>
			</InputContainer>

			<InputContainer>
				<Headline>Total balance</Headline>
				<NumberFormat
					value={totalBalance}
					displayType={'text'}
					thousandSeparator='.'
					decimalSeparator=','
					prefix={'R$'}
					renderText={(value) => (
						<CustomInput
							width='300px'
							type='text'
							size='large'
							color='primary'
							backgroundcolor='#1488cc'
							readOnly
							value={value}
						/>
					)}
				/>
			</InputContainer>
		</Container>
	);
};

export default BalanceInfo;
