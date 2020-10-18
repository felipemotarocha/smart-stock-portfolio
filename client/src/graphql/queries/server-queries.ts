import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
	query GetUserProfile {
		me {
			id
			name
			email
			investedBalance
			availableBalance
			totalBalance
			stocks(sortBy: "totalInvestedAdjustment") {
				id
				name
				price
				symbol
				percentageOfThePortfolio
				changePercent
				marketCap
				totalInvested
				updatedAt
				quantity
				score
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

export const GET_USER_BALANCE_INFO = gql`
	query GetUserBalanceInfo {
		user(id: "5f7d176dad6b0f36440cb08b") {
			id
			availableBalance
			investedBalance
			totalBalance
		}
	}
`;

export const GET_USER_STOCKS = gql`
	query GetUserStocks {
		user(id: "5f7d176dad6b0f36440cb08b") {
			id
			stocks(sortBy: "totalInvestedAdjustment") {
				id
				name
				price
				symbol
				percentageOfThePortfolio
				changePercent
				marketCap
				totalInvested
				updatedAt
				quantity
				score
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
