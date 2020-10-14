import { useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';

import { LOGIN_USER } from '../graphql/mutations/server-mutations';
import { GET_USER_PROFILE } from '../graphql/queries/server-queries';
import { User } from '../helpers/types/user.types';

interface ContextProps {
	currentUser: User | null;
	login: (email: string, password: string) => void;
	logout: () => void;
	checkUserSession: () => void;
	loading: boolean;
}

export const UserContext = createContext<ContextProps>({
	currentUser: null,
	login: () => {},
	checkUserSession: () => {},
	logout: () => {},
	loading: true,
});

export interface UserContextProviderProps {
	children: ReactNode;
}

const UserContextProvider: React.FunctionComponent<UserContextProviderProps> = ({
	children,
}) => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loginUserMutation] = useMutation(LOGIN_USER);
	const { refetch } = useQuery(GET_USER_PROFILE);

	const login = async (email: string, password: string) => {
		const {
			data: {
				login: { user, authToken },
			},
		} = await loginUserMutation({
			variables: { email, password },
		});

		setCurrentUser(user);
		localStorage.setItem('authToken', authToken);
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		setCurrentUser(null);
	};

	const checkUserSession = async () => {
		try {
			setLoading(true);
			const {
				data: { me: user },
			} = await refetch();
			if (user) setCurrentUser(user);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setCurrentUser(null);
		}
	};

	return (
		<UserContext.Provider
			value={{ currentUser, login, checkUserSession, logout, loading }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
