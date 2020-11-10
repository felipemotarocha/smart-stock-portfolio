import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.less";

import HomePage from "../pages/home/home.page";
import LoginPage from "../pages/login/login.page";
import RegisterPage from "../pages/register/register.component";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.context";

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
	const { checkUserSession, currentUser, deleteGuestUser } = useContext(
		UserContext
	);

	window.addEventListener("beforeunload", (ev) => {
		ev.preventDefault();
		console.log(currentUser);
		if (currentUser.guest) {
			deleteGuestUser();
			localStorage.removeItem("authToken");
		}
	});

	useEffect(() => {
		checkUserSession();
		console.log("running");
		const updateGuestUser = () => {
			if (currentUser.guest) {
				deleteGuestUser();
				localStorage.removeItem("authToken");
			}
		};

		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
			updateGuestUser();
		});

		return () => window.removeEventListener("beforeunload", updateGuestUser);
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/login">
					<LoginPage />
				</Route>
				<Route exact path="/register">
					<RegisterPage />
				</Route>

				<Route exact path="/">
					<HomePage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
