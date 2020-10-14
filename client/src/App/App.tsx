import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.less';

import HomePage from '../pages/home/home.page';
import LoginPage from '../pages/login/login.page';
import Authenticated from '../components/authenticated/authenticated.component';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/login'>
					<LoginPage />
				</Route>
				<Authenticated>
					<Route exact path='/'>
						<HomePage />
					</Route>
				</Authenticated>
			</Switch>
		</Router>
	);
};

export default App;
