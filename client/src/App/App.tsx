import * as React from 'react';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.less';

import { UserContext } from '../contexts/user.context';
import HomePage from '../pages/home/home.page';
import { default as LoginPage } from '../pages/login/login.container';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
	const { checkUserSession } = useContext(UserContext);
	React.useEffect(() => {
		checkUserSession();
		// eslint-disable-next-line
	}, []);
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<HomePage />
				</Route>
				<Route exact path='/login'>
					<LoginPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
