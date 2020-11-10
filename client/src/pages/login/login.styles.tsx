import styled from "styled-components";

export const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		padding: 2rem 1.5rem;
	}
`;

export const Content = styled.div`
	width: 500px;
	margin: auto;
	display: flex;
	flex-direction: column;

	h1 {
		text-align: center;
		color: #eee;
	}

	.ant-input:nth-child(3) {
		margin: 1rem 0;
	}

	button:nth-child(5) {
		margin-top: 1rem;
	}

	button:nth-child(6) {
		margin: 1rem 0;
	}
`;
