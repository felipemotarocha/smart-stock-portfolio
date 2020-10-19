import styled from 'styled-components';

export const Container = styled.div`
	min-width: 50vw;
`;

export const InputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	&:nth-child(2) {
		margin: 1rem 0;
	}

	@media (max-width: 1024px) {
		flex-direction: column;
		width: 100%;

		&:nth-child(2) {
			margin: 0.7rem 0;
		}
	}
`;

export const Headline = styled.h2`
	font-weight: 400;
	color: #eee;
	margin: 0 1rem;

	@media (max-width: 1024px) {
		margin-bottom: 0.1rem;
		font-size: 1.1rem;
	}
`;

export const WithButton = styled.div`
	display: flex;

	@media (max-width: 1024px) {
		width: 100%;
		justify-content: center;
	}
`;
