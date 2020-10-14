import styled from 'styled-components';

export const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
`;

export const Content = styled.div`
	width: 400px;
	margin: auto;
	display: flex;
	flex-direction: column;

	.ant-input:nth-child(2) {
		margin: 1rem 0;
	}
`;
