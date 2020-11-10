import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
`;

export const Headline = styled.div`
	display: flex;
	align-items: center;

	p {
		color: #eee;
		font-weight: 400;
		font-size: 2rem;
		margin: 1rem 0;
		margin-right: 1rem;
	}

	button:nth-child(2) {
		margin-right: 1rem;
	}

	@media (min-width: 321px) and (max-width: 767px) {
		justify-content: space-between;
	}
`;

export const Content = styled.div`
	width: 100%;
	height: 413px;
	display: flex;
	flex-flow: wrap;
	justify-content: space-between;
`;

export const NoStocksContainer = styled.div`
	h2 {
		color: #eee;
		margin: 0;
	}

	span {
		color: ${({ theme }) => theme.primaryBlue};
	}
`;
