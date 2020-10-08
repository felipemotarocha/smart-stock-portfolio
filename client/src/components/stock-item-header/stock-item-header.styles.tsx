import styled from 'styled-components';

type ChangePercentProps = {
	isPositive: boolean;
};

export const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	color: #eee;
	border-bottom: 3px solid #5d5c5c;
`;

export const Info = styled.div`
	flex: 2;
`;

export const Value = styled.div`
	text-align: right;
	flex: 1;
`;

export const Symbol = styled.p`
	font-size: 1.7rem;
	font-weight: 600;
	margin: 0;
`;

export const Name = styled.p`
	font-size: 1.3rem;
	margin-top: -0.3rem;
`;

export const Price = styled.p`
	font-size: 1.7rem;
	font-weight: 600;
	margin: 0;
`;

export const ChangePercent = styled.p<ChangePercentProps>`
	font-size: 1.3rem;
	margin-top: -0.3rem;
	text-align: right;

	color: ${({ isPositive, theme }) =>
		isPositive ? theme.primaryBlue : 'red'};
`;
