import styled from 'styled-components';

export const Container = styled.div`
	flex: auto;
	display: flex;
`;

export const ColumnsInfo = styled.div`
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	margin-right: 1rem;

	p {
		font-size: 1.2rem;
		margin: 0.6rem 0;
		font-weight: 600;
		text-align: right;
	}
`;

export const Note = styled.div`
	background: #2a2a2a;
	border-radius: 5px;

	p {
		text-align: center;
	}
`;

export const Columns = styled.div`
	display: flex;
	justify-content: space-between;
	flex: auto;
`;
