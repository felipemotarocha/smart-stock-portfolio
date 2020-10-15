import styled from 'styled-components';

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

	.ant-input {
		text-align: center;
	}
`;

export const Title = styled.p`
	text-align: center;
	color: ${(props) => props.theme.primaryBlue};
	margin: 0.7rem 0;
	font-size: 1.3rem;
	font-weight: 600;
`;

export const Buttons = styled.div`
	display: flex;
	justify-content: center;

	.ant-btn {
		width: 40%;

		&:nth-child(2) {
			margin-left: 1rem;
			background: rgba(0, 0, 0, 0);
			color: ${({ theme }) => theme.primaryBlue};
			border-color: ${({ theme }) => theme.primaryBlue};

			&:hover {
				background: ${({ theme }) => theme.primaryBlue};
				color: #eee;
			}
		}
	}
`;
