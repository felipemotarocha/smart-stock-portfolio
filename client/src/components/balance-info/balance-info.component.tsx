import * as React from 'react';
import { useEffect } from 'react';
import NumberFormat from 'react-number-format';

import { Container, InputContainer, Headline } from './balance-info.styles';

import { CustomInput } from '../custom-input/custom-input.component';
import { SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export interface BalanceInfoProps {
	availableBalanceInput: number;
	setAvailableBalanceInput: React.Dispatch<React.SetStateAction<number>>;
	availableBalance: number;
	investedBalance: number;
	totalBalance: number;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: any) => void;
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
				<NumberFormat
					customInput={CustomInput}
					thousandSeparator=','
					decimalSeparator='.'
					prefix={'R$'}
					width='300px'
					fixedDecimalScale={true}
					value={availableBalanceInput}
					onChange={handleChange}
					onPressEnter={handleSubmit}
				/>
				<Button
					type='primary'
					icon={<SaveOutlined />}
					size='large'
					disabled={
						availableBalanceInput !== availableBalance
							? false
							: true
					}
					onClick={handleSubmit}
				/>
			</InputContainer>

			<InputContainer>
				<Headline>Invested balance</Headline>
				<NumberFormat
					value={investedBalance}
					displayType={'text'}
					thousandSeparator=','
					decimalSeparator='.'
					prefix={'R$'}
					renderText={(value) => (
						<CustomInput
							type='text'
							width='340px'
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
					thousandSeparator=','
					decimalSeparator='.'
					prefix={'R$'}
					renderText={(value) => (
						<CustomInput
							width='340px'
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
