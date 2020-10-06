import * as React from 'react';
import { InputProps } from 'antd/lib/input';

import {
	StyledInput,
	StyledInputNumber,
	GlobalStyled,
} from './custom-input.styles';

export interface CustomInputProps extends InputProps {
	width?: string | number | undefined;
	backgroundColor?: string | undefined;
	borderColor?: string | undefined;
}

const CustomInput: React.FunctionComponent<CustomInputProps> = (props) => {
	const { type, size, placeholder, width, backgroundColor } = props;
	return (
		<>
			<GlobalStyled />
			{type === 'text' ? (
				<StyledInput
					{...props}
					width={width}
					backgroundColor={backgroundColor}
				/>
			) : (
				<StyledInputNumber
					size={size}
					min={1}
					max={999999}
					placeholder={placeholder}
					width={width}
					backgroundColor={backgroundColor}
				/>
			)}
		</>
	);
};

export default CustomInput;
