import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	margin: 0.7rem 0;
	display: flex;

	@media (max-width: 1024px) {
		flex-direction: column;
	}
`;
