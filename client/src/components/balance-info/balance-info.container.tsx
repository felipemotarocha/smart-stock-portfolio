import * as React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';

import BalanceInfo from './balance-info.component';

export interface BalanceInfoContainerProps {}

const GET_USER_BALANCE_INFO = gql`
	query GetUserBalanceInfo {
		user(id: "5f7d176dad6b0f36440cb08b") {
			id
			availableBalance
			investedBalance
			totalBalance
		}
	}
`;

const CHANGE_USER_AVAILABLE_BALANCE = gql`
	mutation ChangeUserAvailableBalance(
		$id: String!
		$newAvailableBalance: Float!
	) {
		changeUserAvailableBalance(
			id: $id
			newAvailableBalance: $newAvailableBalance
		) {
			id
			availableBalance
			investedBalance
			totalBalance
		}
	}
`;

const BalanceInfoContainer: React.FunctionComponent<BalanceInfoContainerProps> = () => {
	const [availableBalanceInput, setAvailableBalanceInput] = useState<number>(
		0
	);
	const { loading, error, data } = useQuery(GET_USER_BALANCE_INFO);
	const [changeUserAvailableBalance] = useMutation(
		CHANGE_USER_AVAILABLE_BALANCE
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// regex to check if the input value is a number
		const re = /^[0-9\b]+$/;

		if (e.target.value === '') {
			setAvailableBalanceInput(0);
		} else if (re.test(e.target.value)) {
			setAvailableBalanceInput(parseInt(e.target.value));
		}
	};

	const handleSubmit = () => {
		changeUserAvailableBalance({
			variables: {
				id: '5f7d176dad6b0f36440cb08b',
				newAvailableBalance: availableBalanceInput,
			},
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const {
		user: { availableBalance, investedBalance, totalBalance },
	} = data;
	return (
		<BalanceInfo
			availableBalanceInput={availableBalanceInput}
			availableBalance={availableBalance}
			investedBalance={investedBalance}
			totalBalance={totalBalance}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export default BalanceInfoContainer;
