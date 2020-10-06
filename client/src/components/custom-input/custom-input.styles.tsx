import styled, { createGlobalStyle } from 'styled-components';
import { Input, InputNumber } from 'antd';
import { InputProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';

interface CustomInputProps extends InputProps {
	width: string | number | undefined;
	backgroundColor: string | undefined;
	borderColor?: string | undefined;
}

interface CustomInputNumberProps extends InputNumberProps {
	width: string | number | undefined;
	backgroundColor: string | undefined;
	borderColor?: string | undefined;
}

export const GlobalStyled = createGlobalStyle`
  input {
	background: rgba(0, 0, 0, 0) !important;
	color: #eee !important;
	border-color: rgba(159, 159, 159, 0.5) !important;
  }

  
`;

export const StyledInput = styled(Input)<CustomInputProps>`
	width: ${({ width }) => width}%;
	background: ${({ backgroundColor }) =>
		backgroundColor ? backgroundColor : 'rgba(0, 0, 0, 0)'};
	color: #eee;
	border-color: ${({ borderColor }) =>
		borderColor ? borderColor : 'rgba(159, 159, 159, 0.5)'};
`;

export const StyledInputNumber = styled(InputNumber)<CustomInputNumberProps>`
	margin: 0 0.5rem;
	width: ${({ width }) => width}%;
	background: ${({ backgroundColor }) =>
		backgroundColor ? backgroundColor : 'rgba(0, 0, 0, 0)'};
	color: #eee;
	border-color: ${({ borderColor }) =>
		borderColor ? borderColor : 'rgba(159, 159, 159, 0.5)'};
`;
