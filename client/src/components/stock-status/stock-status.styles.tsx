import styled from 'styled-components';

type StatusProps = {
	status: 'Wait' | 'Buy';
};

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;

	p {
		font-size: 1.4rem;
		margin: 0;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		flex: initial;
		padding-bottom: 0.7rem;

		p {
			font-size: 1rem;
		}
	}
`;

export const Status = styled.div<StatusProps>`
	background-color: ${({ status }) =>
		status === 'Wait' ? '#e6494c' : '#4bc05e'};
	padding: 0.2rem 0;
	width: 90px;
	text-align: center;
	border-radius: 5px;
	margin-top: 0.1rem;
	font-size: 1.3rem;
	font-weight: 500;

	@media (max-width: 767px) {
		margin-top: 0;
		width: 70px;
		font-size: 1rem;
	}

	@media (width: 768px) {
		width: 70px;
		font-size: 1.1rem;
	}
`;
