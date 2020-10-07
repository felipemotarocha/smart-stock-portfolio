import { gql } from '@apollo/client';

export const CHANGE_USER_AVAILABLE_BALANCE = gql`
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
