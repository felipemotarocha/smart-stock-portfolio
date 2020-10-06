import * as React from 'react';
import { useState } from 'react';

import { Container, InputContainer, Headline } from './balance-info.styles';
import CustomInput from '../custom-input/custom-input.component';

export interface BalanceInfoProps {}

const BalanceInfo: React.FunctionComponent<BalanceInfoProps> = () => {
	const [availableBalance, setAvailableBalance] = useState<number>(0);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const re = /^[0-9\b]+$/;

		if (e.target.value === '') {
			setAvailableBalance(0);
		} else if (re.test(e.target.value)) {
			setAvailableBalance(parseInt(e.target.value));
		}
	};

	return (
		<Container>
			<InputContainer>
				<Headline>Available balance</Headline>
				<CustomInput
					width={30}
					prefix='R$'
					type='text'
					size='large'
					onChange={handleChange}
					value={availableBalance}
				/>
			</InputContainer>

			<InputContainer>
				<Headline>Invested balance</Headline>
				<CustomInput
					type='text'
					width={30}
					prefix='R$'
					size='large'
					backgroundColor='#1488cc'
					borderColor='#1488cc'
					readOnly
				/>
			</InputContainer>

			<InputContainer>
				<Headline>Total balance</Headline>
				<CustomInput
					width={30}
					prefix='R$'
					type='text'
					size='large'
					backgroundColor='#1488cc'
					borderColor='#1488cc'
					readOnly
				/>
			</InputContainer>
		</Container>
	);
};

export default BalanceInfo;
