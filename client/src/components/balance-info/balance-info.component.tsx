import * as React from 'react';
import { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMediaQuery } from 'react-responsive';

import {
	Container,
	InputContainer,
	Headline,
	WithButton,
} from './balance-info.styles';

import { CustomInput } from '../custom-input/custom-input.component';

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

	const isMobile = useMediaQuery({
		query: '(max-device-width: 768px)',
	});

	return (
		<Container>
			<InputContainer>
				<Headline>Available balance</Headline>
				<WithButton>
					<NumberFormat
						customInput={CustomInput}
						thousandSeparator=','
						decimalSeparator='.'
						prefix={'R$'}
						width={isMobile ? '100%' : '300px'}
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
				</WithButton>
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
							width={isMobile ? '100%' : '340px'}
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
							width={isMobile ? '100%' : '340px'}
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
