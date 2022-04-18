// this is the index.js for our client (aka the big daddy for the frontend application)
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// we don't render anything here except the app!!!
render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
);
