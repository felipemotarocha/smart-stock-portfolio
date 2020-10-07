import styled from 'styled-components';

type ItemProps = {
	headline?: boolean;
};

export const Container = styled.div`
	/* flex: auto; */
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 200px;
`;

export const Item = styled.div<ItemProps>`
	margin: 0.6rem 0;
	background-color: ${({ headline, theme }) =>
		headline ? theme.primaryBlue : '#2a2a2a'};
	font-weight: ${({ headline }) => (headline ? '600' : 'initial')};
	font-size: 1.2rem;
	width: 200px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
`;
