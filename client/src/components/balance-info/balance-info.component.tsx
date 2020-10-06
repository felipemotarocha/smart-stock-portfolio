import * as React from 'react';

import { Container, InputContainer, Headline } from './balance-info.styles';
import CustomInput from '../custom-input/custom-input.component';

export interface BalanceInfoProps {}

const BalanceInfo: React.FunctionComponent<BalanceInfoProps> = (props) => {
	return (
		<Container>
			<InputContainer>
				<Headline>Available balance</Headline>
				<CustomInput width={30} prefix='R$' type='text' size='large' />
			</InputContainer>

			<InputContainer>
				<Headline>Invested balance</Headline>
				<CustomInput
					width={30}
					disabled
					prefix='R$'
					type='text'
					size='large'
					backgroundColor='#1488cc'
					borderColor='#1488cc'
				/>
			</InputContainer>

			<InputContainer>
				<Headline>Total balance</Headline>
				<CustomInput
					width={30}
					disabled
					prefix='R$'
					type='text'
					size='large'
					backgroundColor='#1488cc'
					borderColor='#1488cc'
				/>
			</InputContainer>
		</Container>
	);
};

export default BalanceInfo;
