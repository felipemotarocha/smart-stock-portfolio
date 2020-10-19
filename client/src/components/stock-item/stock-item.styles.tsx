import styled from 'styled-components';

type ContainerProps = {
	editableStocks: boolean;
};

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;
	height: 350px;
	width: 820px;
	border-radius: 5px;
	background: ${({ editableStocks }) =>
		editableStocks ? '#2a2a2a' : '#515151'};
	padding: 1.2rem 2rem;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
	margin-bottom: 4rem;

	@media (max-width: 767px) {
		width: 100%;
		height: auto;
		margin-bottom: 1.5rem;
		padding: 1rem 1.3rem;
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		width: 100%;
	}
`;
