import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import App from './App/App';

import { GlobalStyle } from './index.styles';

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<ThemeProvider theme={{ primaryBlue: '#1488cc' }}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
