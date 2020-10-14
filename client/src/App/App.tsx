import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.less';

import HomePage from '../pages/home/home.page';
import { default as LoginPage } from '../pages/login/login.container';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
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
