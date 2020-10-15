import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation LoginUser($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				id
				name
				email
				password
				investedBalance
				availableBalance
				totalBalance
				stocks {
					id
					name
					symbol
					price
					quantity
					changePercent
					percentageOfThePortfolio
					totalInvested
					updatedAt
					note
					idealPercentageOfThePortfolio
					idealTotalInvested
					idealQuantity
					quantityAdjustment
					totalInvestedAdjustment
					status
				}
			}
			authToken
		}
	}
`;

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
			name
			email
			password
			investedBalance
			availableBalance
			totalBalance
			stocks {
				id
				name
				symbol
				price
				quantity
				changePercent
				percentageOfThePortfolio
				totalInvested
				updatedAt
				note
				idealPercentageOfThePortfolio
				idealTotalInvested
				idealQuantity
				quantityAdjustment
				totalInvestedAdjustment
				status
			}
		}
	}
`;

export const ADD_STOCK = gql`
	mutation AddStock(
		$withCost: Boolean!
		$symbol: String!
		$quantity: Float!
	) {
		addStock(
			withCost: $withCost
			userId: "5f7d176dad6b0f36440cb08b"
			symbol: $symbol
			quantity: $quantity
		) {
			id
			investedBalance
			availableBalance
			totalBalance
			stocks {
				id
				name
				symbol
				price
				quantity
				percentageOfThePortfolio
				totalInvested
				updatedAt
				note
				idealPercentageOfThePortfolio
				idealTotalInvested
				idealQuantity
				quantityAdjustment
				totalInvestedAdjustment
				status
			}
		}
	}
`;
