import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from '../pages/home.page';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
	return (
		<Router>
			<Route path='/'>
				<HomePage />
			</Route>
		</Router>
	);
};

export default App;
