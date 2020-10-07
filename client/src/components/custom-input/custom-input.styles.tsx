import styled, { createGlobalStyle } from 'styled-components';
import { Input, InputNumber } from 'antd';
import { InputProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';

interface CustomInputProps extends InputProps {
	width: string | number | undefined;
	backgroundcolor: string | undefined;
	bordercolor?: string | undefined;
}

interface CustomInputNumberProps extends InputNumberProps {
	width: string | number | undefined;
	backgroundcolor: string | undefined;
	bordercolor?: string | undefined;
}

export const GlobalStyled = createGlobalStyle`
  input {
	background: rgba(0, 0, 0, 0) !important;
	color: #eee !important;
  }
  
`;

export const StyledInput = styled(Input)<CustomInputProps>`
	width: ${({ width }) => width};
	display: flex;
	align-items: center;
	background: ${({ backgroundcolor }) =>
		backgroundcolor ? backgroundcolor : 'rgba(0, 0, 0, 0)'};
	color: #eee;
	border-color: ${({ bordercolor }) =>
		bordercolor ? bordercolor : 'rgba(159, 159, 159, 0.5)'};

	svg {
		color: #eee;
	}

	.ant-input-group-addon {
		background: ${({ theme }) => theme.primaryBlue};
		border-color: ${({ theme }) => theme.primaryBlue};
	}
`;

export const StyledInputNumber = styled(InputNumber)<CustomInputNumberProps>`
	margin: 0 0.5rem;
	width: ${({ width }) => `${width}px`};
	background: ${({ backgroundcolor }) =>
		backgroundcolor ? backgroundcolor : 'rgba(0, 0, 0, 0)'};
	color: #eee;
	border-color: ${({ bordercolor }) =>
		bordercolor ? bordercolor : 'rgba(159, 159, 159, 0.5)'};
`;
