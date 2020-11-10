import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
	query GetUserProfile {
		me {
			_id
			guest
			name
			email
			investedBalance
			availableBalance
			totalBalance
			stocks(sortBy: "totalInvestedAdjustment") {
				_id
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
