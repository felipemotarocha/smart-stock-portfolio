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

export const ADD_USER_STOCK = gql`
	mutation addUserStock(
		$withCost: Boolean!
		$symbol: String!
		$quantity: Float!
	) {
		addUserStock(
			withCost: $withCost
			userId: "5f7d176dad6b0f36440cb08b"
			symbol: $symbol
			quantity: $quantity
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

export const EDIT_USER_STOCK = gql`
	mutation editUserStock(
		$userId: String!
		$stockId: String!
		$note: Float
		$quantity: Float
	) {
		editUserStock(
			userId: $userId
			stockId: $stockId
			note: $note
			quantity: $quantity
		) {
			id
			name
			email
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

export const DELETE_USER_STOCK = gql`
	mutation deleteUserStock($userId: String!, $stockId: String!) {
		deleteUserStock(userId: $userId, stockId: $stockId) {
			id
			name
			email
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
