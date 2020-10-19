import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

	.ant-popover-content {
		
		.ant-popover-inner  {
			background: #515151;
			box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);

			.ant-popover-message {
				color: #eee;
			}
		}

		.ant-popover-arrow {
			border-right-color: #515151 !important;
			border-bottom-color: #515151 !important;
		}

		@media(max-width: 767px) {
			width: 90%;
			margin: 0 auto;
		}
	} 
`;

export const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Fields = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 2px solid #5d5c5c;
	padding-bottom: 1.5rem;
	margin-bottom: 1.5rem;
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
`;

export const Title = styled.p`
	text-align: center;
	color: ${(props) => props.theme.primaryBlue};
	margin: 0.7rem 0;
	font-size: 1.3rem;
	font-weight: 600;

	@media (max-width: 767px) {
		font-size: 1rem;
		margin: 0.4rem 0;
	}
`;

export const Buttons = styled.div`
	display: flex;
	justify-content: center;
	flex-flow: wrap;

	.ant-btn {
		width: 40%;

		&:nth-child(1) {
			width: 40%;
		}

		&:nth-child(2) {
			width: 40%;
			margin-left: 1rem;
			background: rgba(0, 0, 0, 0);
			color: ${({ theme }) => theme.primaryBlue};
			border-color: ${({ theme }) => theme.primaryBlue};

			&:hover {
				background: ${({ theme }) => theme.primaryBlue};
				color: #eee;
			}
		}

		&:nth-child(3) {
			margin-top: 1rem;
			background: #ff3232;
			color: #eee;
			border-color: #ff3232;

			&:hover {
				background: rgba(0, 0, 0, 0);
				color: #ff3232;
			}
		}
	}

	@media (max-width: 767px) {
		flex-direction: column;

		.ant-btn {
			&:nth-child(1) {
				width: 100%;
			}

			&:nth-child(2) {
				width: 100%;
				margin: 0.7rem 0;
			}

			&:nth-child(3) {
				width: 100%;
				margin-top: 0;
			}
		}
	}
`;
