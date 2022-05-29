import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Recipes from './components/Recipes';
import CreateRecipe from './components/CreateRecipe';
import SearchRecipe from './components/SearchRecipe';

import './stylesheets/styles.css';

const App = (props) => {
	return (
		<div className='router'>
			<main>
				<Switch>
					<Route exact path='/' component={Recipes} />
					<Route exact path='/create' component={CreateRecipe} />
					<Route exact path='/search' component={SearchRecipe} />
				</Switch>
			</main>
		</div>
	);
};

export default App;
