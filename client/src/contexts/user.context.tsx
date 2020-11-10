import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";
import * as React from "react";
import { createContext, ReactNode, useState } from "react";
import { GoogleLoginResponse } from "react-google-login";

import {
	DELETE_GUEST,
	LOGIN_WITH_CREDENTIALS,
	LOGIN_WITH_GOOGLE,
	REGISTER,
	LOGIN_GUEST,
} from "../graphql/mutations/server-mutations";
import { GET_USER_PROFILE } from "../graphql/queries/server-queries";
import { User } from "../helpers/types/user.types";

interface ContextProps {
	currentUser: User | null;
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
	loginAsGuest: () => Promise<void> | void;
	logout: () => void;
	deleteGuest: () => void;
	checkUserSession: () => Promise<void> | void;
	updateCurrentUser: (user: User) => Promise<void> | void;
	editableStocks: boolean;
	setEditableStocks: React.Dispatch<React.SetStateAction<boolean>> | null;
	loading: boolean;
}

export const UserContext = createContext<ContextProps>({
	currentUser: null,
	loginWithCredentials: () => {},
	loginWithGoogle: () => {},
	loginAsGuest: () => {},
	register: () => {},
	logout: () => {},
	deleteGuest: () => {},
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
	const [loginGuestMutation] = useMutation(LOGIN_GUEST, {
		onCompleted: () => message.success(`You successfully entered as a guest!`),
	});
	const [deleteGuestMutation] = useMutation(DELETE_GUEST, {
		variables: { guestId: currentUser?._id },
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

	const loginAsGuest = async () => {
		try {
			const {
				data: {
					loginGuest: { user, authToken },
				},
			} = await loginGuestMutation();
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

	const logout = async () => {
		try {
			if (currentUser?.guest) await deleteGuestMutation();
			localStorage.removeItem("authToken");
			setCurrentUser(null);
		} catch (err) {
			message.error(err.message);
		}
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
			setCurrentUser(null);
			localStorage.removeItem("authToken");
			setLoading(false);
		}
	};

	const deleteGuest = () => {
		deleteGuestMutation();
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
				loginAsGuest,
				register,
				logout,
				deleteGuest,
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
