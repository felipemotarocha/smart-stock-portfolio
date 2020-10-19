import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	.modal {
		color: #eee;

		.ant-modal-body {
			padding: 0 3rem;

			@media (max-width: 767px) {
				padding: 0 1rem;
			}
		}

		.ant-modal-content {
			background: #2a2a2a;
		}

		.ant-modal-header {
			border-color: #2a2a2a;
			background: #2a2a2a;

			.ant-modal-title {
				color: #1488cc;
				font-weight: 600;
				font-size: 1.2rem;
				text-align: center;
			}
		}

		.ant-modal-footer {
			border-color: #2a2a2a;
			display: flex;
			justify-content: center;
			padding: 1.5rem 0;

			button {
				width: 32%;
			}

			button:nth-child(1) {
				background: rgba(0, 0, 0, 0);
				color: #1488cc;
				border-color: #1488cc;

				&:hover {
					background: #1488cc;
					color: #eee;
				}
			}
		}
	}

`;

export const Container = styled.div`
	.ant-modal-root .ant-modal-wrap .ant-modal .ant-modal-content {
		background: #2a2a2a !important;
	}
`;

export const Fields = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 2px solid #5d5c5c;
	padding-bottom: 1.5rem;

	@media (max-width: 767px) {
		display: flex;
		flex-direction: column;
	}
`;

export const Field = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 32%;

	input {
		text-align: center;
	}

	@media (max-width: 767px) {
		width: 100%;
	}
`;

export const Title = styled.p`
	text-align: center;
	color: ${(props) => props.theme.primaryBlue};
	margin: 0.7rem 0;
	font-size: 1.3rem;
	font-weight: 600;
`;
