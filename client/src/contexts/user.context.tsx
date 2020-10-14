import { useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';

import { LOGIN_USER } from '../graphql/mutations/server-mutations';
import { GET_USER_PROFILE } from '../graphql/queries/server-queries';
import { User } from '../helpers/types/user.types';

interface ContextProps {
	currentUser: User | null;
	login: (email: string, password: string) => void;
	checkUserSession: () => void;
}

export const UserContext = createContext<ContextProps>({
	currentUser: null,
	login: () => {},
	checkUserSession: () => {},
});

export interface UserContextProviderProps {
	children: ReactNode;
}

const UserContextProvider: React.FunctionComponent<UserContextProviderProps> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const {
		data: getUserProfileData,
		loading: getUserProfileDataLoading,
		error: getUserProfileError,
	} = useQuery(GET_USER_PROFILE);
	const [loginUserMutation] = useMutation(LOGIN_USER);

	const login = async (email: string, password: string) => {
		const {
			data: {
				login: { user, authToken },
			},
		} = await loginUserMutation({
			variables: { email, password },
		});

		localStorage.setItem('authToken', authToken);
		setCurrentUser(user);
	};

	const checkUserSession = () => {
		if (getUserProfileError) return setCurrentUser(null);
		if (!getUserProfileDataLoading && getUserProfileData) {
			const { me: user } = getUserProfileData;
			setCurrentUser(user);
		}
	};

	return (
		<UserContext.Provider value={{ currentUser, login, checkUserSession }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
