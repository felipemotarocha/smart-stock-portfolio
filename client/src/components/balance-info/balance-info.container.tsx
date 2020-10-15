import * as React from 'react';
import { useMutation } from '@apollo/client';
import { useState, useContext } from 'react';

import { CHANGE_USER_AVAILABLE_BALANCE } from '../../graphql/mutations/server-mutations';
import { UserContext } from '../../contexts/user.context';

import BalanceInfo from './balance-info.component';

export interface BalanceInfoContainerProps {}

const BalanceInfoContainer: React.FunctionComponent<BalanceInfoContainerProps> = () => {
	const [availableBalanceInput, setAvailableBalanceInput] = useState<number>(
		0
	);
	const { currentUser, updateCurrentUser } = useContext(UserContext);
	const [changeUserAvailableBalance] = useMutation(
		CHANGE_USER_AVAILABLE_BALANCE,
		{
			onCompleted: ({ changeUserAvailableBalance: user }) =>
				updateCurrentUser(user),
		}
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
				id: currentUser!.id,
				newAvailableBalance: availableBalanceInput,
			},
		});
	};

	return (
		<>
			{currentUser ? (
				<BalanceInfo
					availableBalanceInput={availableBalanceInput}
					setAvailableBalanceInput={setAvailableBalanceInput}
					availableBalance={currentUser.availableBalance}
					investedBalance={currentUser.investedBalance}
					totalBalance={currentUser.totalBalance}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			) : null}
		</>
	);
};

export default BalanceInfoContainer;
