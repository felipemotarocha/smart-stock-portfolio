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
`;

export const Headline = styled.h2`
	font-weight: 400;
	color: #eee;
	margin: 0 1rem;
`;
