import * as React from 'react';
import { InputProps } from 'antd/lib/input';

import {
	StyledInput,
	StyledInputNumber,
	GlobalStyled,
} from './custom-input.styles';

export interface CustomInputProps extends InputProps {
	width?: string | number | undefined;
	backgroundcolor?: string | undefined;
	bordercolor?: string | undefined;
}

const CustomInput: React.FunctionComponent<CustomInputProps> = (props) => {
	const { type, size, placeholder, width, backgroundcolor } = props;
	return (
		<>
			<GlobalStyled />
			{type === 'text' ? (
				<StyledInput
					{...props}
					width={width}
					backgroundcolor={backgroundcolor}
				/>
			) : (
				<StyledInputNumber
					size={size}
					min={1}
					max={999999}
					placeholder={placeholder}
					width={width}
					backgroundcolor={backgroundcolor}
				/>
			)}
		</>
	);
};

export default CustomInput;
