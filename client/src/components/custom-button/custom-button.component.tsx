import * as React from 'react';
import { ButtonProps } from 'antd/lib/button';

import { StyledButton } from './custom-button.styles';

export interface CustomButtonProps extends ButtonProps {
	outlined?: boolean;
}

const CustomButton: React.FunctionComponent<CustomButtonProps> = (props) => {
	const { outlined, ...rest } = props;
	return <StyledButton {...rest} outlined={outlined} />;
};

export default CustomButton;
