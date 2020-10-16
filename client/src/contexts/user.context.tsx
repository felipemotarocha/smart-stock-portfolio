import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';

import {
	LOGIN_USER,
	REGISTER_USER,
} from '../graphql/mutations/server-mutations';
import { GET_USER_PROFILE } from '../graphql/queries/server-queries';
import { User } from '../helpers/types/user.types';

interface ContextProps {
	currentUser: User | null;
	login: (email: string, password: string) => void;
	register: (name: string, email: string, password: string) => void;
	logout: () => void;
	checkUserSession: () => void;
	updateCurrentUser: (user: User) => void;
	editableStocks: boolean;
	setEditableStocks: React.Dispatch<React.SetStateAction<boolean>> | null;
	loading: boolean;
}

export const UserContext = createContext<ContextProps>({
	currentUser: null,
	login: () => {},
	register: () => {},
	logout: () => {},
	checkUserSession: () => {},
	updateCurrentUser: () => {},
	editableStocks: false,
	setEditableStocks: null,
	loading: true,
});

export interface UserContextProviderProps {
	children: ReactNode;
}

const UserContextProvider: React.FunctionComponent<UserContextProviderProps> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [editableStocks, setEditableStocks] = useState(false);
	const [loading, setLoading] = useState(true);

	const [loginUserMutation] = useMutation(LOGIN_USER);
	const [registerUserMutation] = useMutation(REGISTER_USER);
	const { refetch } = useQuery(GET_USER_PROFILE);

	const login = async (email: string, password: string) => {
		try {
			const {
				data: {
					login: { user, authToken },
				},
			} = await loginUserMutation({
				variables: { email, password },
			});

			setCurrentUser(user);
			localStorage.setItem('authToken', authToken);
		} catch (err) {
			message.error(err.message);
		}
	};

	const register = async (name: string, email: string, password: string) => {
		try {
			const {
				data: {
					register: { user, authToken },
				},
			} = await registerUserMutation({
				variables: { name, email, password },
			});
			console.log(user);
			setCurrentUser(user);
			localStorage.setItem('authToken', authToken);
		} catch (err) {
			message.error(err.message);
		}
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

	const updateCurrentUser = async (user: User) => {
		setCurrentUser(user);
	};

	return (
		<UserContext.Provider
			value={{
				currentUser,
				login,
				register,
				logout,
				checkUserSession,
				updateCurrentUser,
				editableStocks,
				setEditableStocks,
				loading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
