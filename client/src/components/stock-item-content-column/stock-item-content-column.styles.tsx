import styled from 'styled-components';

type ItemProps = {
	headline?: boolean;
	adjustment?: boolean;
};

export const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 200px;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const Item = styled.div<ItemProps>`
	margin: 0.6rem 0;
	background-color: ${({ headline, theme }) =>
		headline ? theme.primaryBlue : '#2a2a2a'};
	font-weight: ${({ headline, adjustment }) =>
		headline || adjustment ? '600' : 'initial'};
	font-size: 1.2rem;
	width: 200px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;

	color: ${({ adjustment, theme }) =>
		adjustment ? theme.primaryBlue : 'inherit'};

	@media (max-width: 767px) {
		width: 100%;
		font-size: 1rem;
		margin: 0.4rem 0;
	}

	@media (width: 768px) {
		font-size: 1rem;
		width: 190px;
	}
`;
