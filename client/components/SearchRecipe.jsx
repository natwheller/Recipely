import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';

const SearchRecipe = (props) => {
	const [recipes, setRecipes] = useState([]);
	const [input, setInput] = useState('');
	let instructions = '';

	const loadRecipe = async () => {
		const response = await fetch(
			`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
			// https://www.themealdb.com/api/json/v1/1/filter.php?i=bread
		);
		const data = await response.json();
		setRecipes(data.meals);
		console.log(data.meals);
	};

	const handleClick = () => {
		console.log(`this is my input: ` + input);
		loadRecipe();
	};

	const loadDirections = async (id) => {
		// might need to do a forEach up here and then store all results in array or object
		const response = await fetch(
			`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
			// https://www.themealdb.com/api/json/v1/1/lookup.php?i=53016
		);
		const data = await response.json();
		instructions = await data.meals[0].strYoutube;
		// const vidsArr = [];
		// vidsArr.push(instructions);
		// console.log('storing the youtube url in instructions' + instructions);
		// console.log(vidsArr);
	};

	const routeChange = () => {
		window.location.replace(`${instructions}`);
	};

	const recipeItems = recipes.map(function (r) {
		// console.log(r.idMeal);
		loadDirections(r.idMeal);
		return (
			<>
				<h4>{r.strMeal}</h4>
				<button classNme='search-btn' onClick={routeChange}>
					Watch Youtube Tutorial
				</button>
				<img src={r.strMealThumb} />
			</>
		);
	});

	return (
		<>
			<h3>Search For Recipes</h3>
			<div className='searchBar'>
				<input
					style={{ width: '50%', height: '30px' }}
					type='text'
					placeholder='Type an ingredient...'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					className='search-btn'
					style={{ width: '200px', height: '30px' }}
					onClick={handleClick}
				>
					Search
				</button>
				<div>{recipeItems}</div>

				<Link to='/' className='backLink'>
					<button
						className='search-btn'
						style={{ width: '200px', height: '30px' }}
					>
						Back to all recipes
					</button>
				</Link>
			</div>
		</>
	);
};

export default withRouter(SearchRecipe);
