import styled from 'styled-components';
import { Button } from 'antd';

type StyledButtonProps = {
	outlined?: boolean;
};

export const StyledButton = styled(Button)<StyledButtonProps>`
	background: ${({ outlined, theme }) =>
		outlined ? 'rgba(0,0,0,0)' : theme.primaryBlue};
	color: ${({ outlined, theme }) => (outlined ? theme.primaryBlue : '#eee')};
`;
