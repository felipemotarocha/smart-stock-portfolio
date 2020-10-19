import styled from 'styled-components';

export const Container = styled.div`
	flex: auto;
	display: flex;
	align-items: flex-start;
	padding: 1.2rem 0;

	@media (max-width: 767px) {
		flex-direction: column;
		padding: 0.35rem 0;
	}
`;

export const ColumnsInfo = styled.div`
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	margin-right: 1rem;

	p {
		font-size: 1.2rem;
		margin: 0.6rem 0;
		font-weight: 600;
		text-align: right;
	}

	@media (max-width: 767px) {
		display: none;
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		margin-right: 1.5rem;
	}
`;

export const Score = styled.div`
	background: #2a2a2a;
	border-radius: 5px;
	position: relative;
	min-height: 50px;
	max-height: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	p:nth-child(1) {
		margin: 0;
		margin-bottom: -0.3rem;
		font-size: 0.75rem;
		text-align: center;
	}

	p:nth-child(2) {
		text-align: center;
		margin: 0;
	}
`;

export const Columns = styled.div`
	display: flex;
	justify-content: space-between;
	flex: auto;

	@media (max-width: 767px) {
		flex-direction: column;
		width: 100%;
	}
`;
