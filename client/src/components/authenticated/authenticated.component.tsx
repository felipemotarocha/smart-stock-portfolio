import * as React from 'react';
import { useContext, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';

export interface AuthenticatedProps {
	children: ReactNode;
}

const Authenticated: React.FunctionComponent<AuthenticatedProps> = ({
	children,
}) => {
	const { checkUserSession, currentUser, loading } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		checkUserSession();
		console.log('happening');
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!loading && !currentUser) history.push('/login');
	}, [currentUser, history, loading]);

	return <>{loading ? null : children}</>;
};

export default Authenticated;
