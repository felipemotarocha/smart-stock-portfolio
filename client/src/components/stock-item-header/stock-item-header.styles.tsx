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

	@media (max-width: 768px) {
		flex-wrap: wrap;
		flex-direction: row-reverse;
		align-items: center;
	}
`;

export const Info = styled.div`
	flex: 2;

	@media (max-width: 768px) {
		flex-basis: 100%;
	}
`;

export const Symbol = styled.p`
	font-size: 1.7rem;
	font-weight: 600;
	margin: 0;

	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

export const Name = styled.p`
	font-size: 1.3rem;
	margin-top: -0.3rem;

	@media (max-width: 768px) {
		margin: 0;
		font-size: 1rem;
		margin-top: -0.45rem;
	}
`;

export const Value = styled.div`
	text-align: right;
	flex: 1;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
	}
`;

export const Price = styled.p`
	font-size: 1.7rem;
	font-weight: 600;
	margin: 0;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

export const ChangePercent = styled.p<ChangePercentProps>`
	font-size: 1.3rem;
	margin-top: -0.3rem;
	text-align: right;

	color: ${({ isPositive, theme }) =>
		isPositive ? theme.primaryBlue : 'red'};

	@media (max-width: 768px) {
		text-align: left;
		margin-bottom: 0;
		font-size: 1rem;
	}
`;
