import * as React from 'react';
import { useMutation } from '@apollo/client';
import { useState, useContext } from 'react';

import { CHANGE_USER_AVAILABLE_BALANCE } from '../../graphql/mutations/server-mutations';
import { UserContext } from '../../contexts/user.context';

import BalanceInfo from './balance-info.component';
import { message } from 'antd';

export interface BalanceInfoContainerProps {}

const BalanceInfoContainer: React.FunctionComponent<BalanceInfoContainerProps> = () => {
	const [availableBalanceInput, setAvailableBalanceInput] = useState<number>(
		0
	);
	const { currentUser, updateCurrentUser } = useContext(UserContext);
	const [changeUserAvailableBalance] = useMutation(
		CHANGE_USER_AVAILABLE_BALANCE,
		{
			onCompleted: ({ changeUserAvailableBalance: user }) => {
				updateCurrentUser(user);
				message.success(
					'Your available balance was successfully changed.'
				);
			},
		}
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const valueInNumber = Number(
			event.target.value.replace(/[^0-9.]+/g, '')
		);
		setAvailableBalanceInput(valueInNumber);
	};

	const handleSubmit = () => {
		changeUserAvailableBalance({
			variables: {
				id: currentUser!._id,
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
