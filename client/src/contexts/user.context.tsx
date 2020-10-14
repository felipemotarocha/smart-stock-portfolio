import { useMutation } from '@apollo/client';
import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';

import { LOGIN_USER } from '../graphql/mutations/server-mutations';
import { User } from '../helpers/types/user.types';

interface ContextProps {
	currentUser: User | null;
	login: (email: string, password: string) => void;
}

export const UserContext = createContext<ContextProps>({
	currentUser: null,
	login: () => {},
});

export interface UserContextProviderProps {
	children: ReactNode;
}

const UserContextProvider: React.FunctionComponent<UserContextProviderProps> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loginUserMutation] = useMutation(LOGIN_USER);

	React.useEffect(() => {
		console.log(currentUser);
	}, [currentUser]);

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

	return (
		<UserContext.Provider value={{ currentUser, login }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
