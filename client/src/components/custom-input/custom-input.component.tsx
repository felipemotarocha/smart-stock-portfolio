import * as React from 'react';
import { InputProps } from 'antd/lib/input';

import {
	StyledInput,
	StyledInputNumber,
	GlobalStyled,
} from './custom-input.styles';
import { InputNumberProps } from 'antd/lib/input-number';

export interface CustomInputProps extends InputProps {
	width?: string | number | undefined;
	backgroundcolor?: string | undefined;
	bordercolor?: string | undefined;
	isAvailableBalanceInput?: boolean;
}

export const CustomInput: React.FunctionComponent<CustomInputProps> = (
	props
) => {
	const { width, backgroundcolor } = props;
	return (
		<>
			<GlobalStyled />

			<StyledInput
				width={width}
				backgroundcolor={backgroundcolor}
				size='large'
				{...props}
			/>
		</>
	);
};

export interface CustomNumberInputProps extends InputNumberProps {
	width?: string | number | undefined;
	backgroundcolor?: string | undefined;
	bordercolor?: string | undefined;
}

export const CustomNumberInput: React.FunctionComponent<CustomNumberInputProps> = (
	props
) => {
	const { size, placeholder, width, backgroundcolor } = props;

	return (
		<>
			<GlobalStyled />
			<StyledInputNumber
				size={size}
				placeholder={placeholder}
				width={width}
				backgroundcolor={backgroundcolor}
				{...props}
			/>
		</>
	);
};
