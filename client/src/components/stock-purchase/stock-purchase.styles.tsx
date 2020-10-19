import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;

	h2 {
		text-align: center;
		font-weight: 400;
		color: #eee;
		margin: 0;
		margin-bottom: 0.1rem;
		font-size: 1.1rem;
	}
`;

export const InputsContainer = styled.div`
	display: flex;
	max-width: 50vw;

	@media (max-width: 1024px) {
		justify-content: center;
		max-width: 100%;
		margin-bottom: 0.7rem;

		input {
			width: 100%;
		}
	}
`;
