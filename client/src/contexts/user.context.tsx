import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";
import * as React from "react";
import { createContext, ReactNode, useState } from "react";
import { GoogleLoginResponse } from "react-google-login";
import { GUEST_USER, GuestUser } from "../constants/user.constants";

import {
	LOGIN_WITH_CREDENTIALS,
	LOGIN_WITH_GOOGLE,
	REGISTER,
} from "../graphql/mutations/server-mutations";
import { GET_USER_PROFILE } from "../graphql/queries/server-queries";
import { User } from "../helpers/types/user.types";

interface ContextProps {
	currentUser: User | GuestUser;
	loginWithCredentials: (
		email: string,
		password: string
	) => Promise<void> | void;
	loginWithGoogle: (
		googleResponse: GoogleLoginResponse
	) => Promise<void> | void;
	register: (
		name: string,
		email: string,
		password: string
	) => Promise<void> | void;
	logout: () => void;
	checkUserSession: () => Promise<void> | void;
	updateCurrentUser: (user: User) => Promise<void> | void;
	editableStocks: boolean;
	setEditableStocks: React.Dispatch<React.SetStateAction<boolean>> | null;
	loading: boolean;
}

export const UserContext = createContext<ContextProps>({
	currentUser: GUEST_USER,
	loginWithCredentials: () => {},
	loginWithGoogle: () => {},
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
	const [currentUser, setCurrentUser] = useState<User | GuestUser>(GUEST_USER);
	const [editableStocks, setEditableStocks] = useState(false);
	const [loading, setLoading] = useState(true);

	const [loginWithCredentialsMutation] = useMutation(LOGIN_WITH_CREDENTIALS, {
		onCompleted: ({ loginWithCredentials: { user } }) =>
			message.success(`Welcome back, ${user.name}!`),
	});
	const [loginWithGoogleMutation] = useMutation(LOGIN_WITH_GOOGLE, {
		onCompleted: ({ loginWithGoogle: { user } }) =>
			message.success(`Welcome, ${user.name}!`),
	});
	const [registerMutation] = useMutation(REGISTER, {
		onCompleted: ({ register: { user } }) =>
			message.success(`Welcome, ${user.name}!`),
	});
	const { refetch } = useQuery(GET_USER_PROFILE);

	const loginWithCredentials = async (email: string, password: string) => {
		try {
			const {
				data: {
					loginWithCredentials: { user, authToken },
				},
			} = await loginWithCredentialsMutation({
				variables: { email, password },
			});

			setCurrentUser(user);
			localStorage.setItem("authToken", authToken);
		} catch (err) {
			message.error(err.message);
		}
	};

	const loginWithGoogle = async (googleResponse: GoogleLoginResponse) => {
		const {
			profileObj: { name, email, googleId },
		} = googleResponse;
		try {
			const {
				data: {
					loginWithGoogle: { user, authToken },
				},
			} = await loginWithGoogleMutation({
				variables: { name, email, googleId },
			});

			setCurrentUser(user);
			localStorage.setItem("authToken", authToken);
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
			} = await registerMutation({
				variables: { name, email, password },
			});

			setCurrentUser(user);
			localStorage.setItem("authToken", authToken);
		} catch (err) {
			message.error(err.message);
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setCurrentUser(GUEST_USER);
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
			setCurrentUser(GUEST_USER);
		}
	};

	const updateCurrentUser = async (user: User) => {
		setCurrentUser(user);
	};

	return (
		<UserContext.Provider
			value={{
				currentUser,
				loginWithCredentials,
				loginWithGoogle,
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
