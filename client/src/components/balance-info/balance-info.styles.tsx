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

	@media (max-width: 768px) {
		flex-direction: column;
		margin: 1rem 0;
		width: 100%;
	}
`;

export const Headline = styled.h2`
	font-weight: 400;
	color: #eee;
	margin: 0 1rem;
`;

export const WithButton = styled.div`
	display: flex;

	@media (max-width: 768px) {
		width: 100%;
	}
`;
