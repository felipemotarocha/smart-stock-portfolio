import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
`;

export const Headline = styled.h1`
	display: inline-block;
	color: #eee;
	border-bottom: 3px solid ${(props) => props.theme.primaryBlue};
	padding: 0.2rem 1rem;
	font-weight: 400;
`;

export const InputsContainer = styled.div`
	display: flex;
	max-width: 50vw;
	margin: 0.7rem 0;

	.ant-input {
		width: 40%;
		background: rgba(0, 0, 0, 0);
		color: #eee;
		border-color: rgba(159, 159, 159, 0.5);
	}

	.ant-input-number {
		margin: 0 0.5rem;
		width: 15%;
		background: rgba(0, 0, 0, 0);
		color: #eee;
		border-color: rgba(159, 159, 159, 0.5);
	}
`;
