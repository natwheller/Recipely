import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

const CreateRecipe = (props) => {
	// useState hooks to update values based on user input
	const [name, setName] = useState('');
	const [prep_time, setPrepTime] = useState('');
	const [cook_time, setCookTime] = useState('');
	const [serving_size, setServingSize] = useState('');
	const [image_url, setImageUrl] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [directions, setDirections] = useState('');

	const saveRecipe = () => {
		// checks if any fields are empty
		if (name === '') alert('name is required');
		if (prep_time === '') alert('prep time is required');
		if (cook_time === '') alert('cook time is required');
		if (serving_size === '') alert('serving size is required');
		if (ingredients === '') alert('ingredients are required');
		if (directions === '') alert('directions are required');

		const body = {
			name,
			prep_time,
			cook_time,
			serving_size,
			image_url,
			ingredients,
			directions,
		};

		// checks for empty required fields before submitting
		let hasEmptyInput = false;
		for (const key in body) {
			if (body[key] === '' && key !== 'image_url') hasEmptyInput = true;
		}

		// post request to send recipe to database
		if (!hasEmptyInput) {
			fetch('/api/recipe', {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/JSON',
				},
				body: JSON.stringify(body),
			})
				.then((resp) => resp.json())
				.then((data) =>
					console.log('this is logging in post fetch request' + data)
				)

				.then(() => {
					props.history.push('/');
				})
				.catch((err) =>
					console.log('CreateRecipe fetch /api/recipe: ERROR: ', err)
				);
		}
	};

	// this is where we render the create recipe form
	return (
		<section className='mainSection createRecipeContainer'>
			<header className='pageHeader'>
				<h2>Recipe Creator</h2>
				<Link to='/' className='backLink'>
					<button type='button' className='btnnav'>
						Back to all recipes
					</button>
				</Link>
			</header>
			<article className='card createRecipe'>
				<h3>Enter your recipe details</h3>
				<div className='createRecipeFields'>
					<label htmlFor='name'>Name: </label>
					<input
						name='name'
						placeholder='Enter name of your recipe'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='preptime'>Prep Time: </label>
					<input
						name='prepTime'
						placeholder='Enter prep time'
						value={prep_time}
						onChange={(e) => setPrepTime(e.target.value)}
					/>
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='cooktime'>Cook Time: </label>
					<input
						name='cookTime'
						placeholder='Enter cook time'
						value={cook_time}
						onChange={(e) => setCookTime(e.target.value)}
					/>
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='servingsize'>Serving Size: </label>
					<input
						name='servingSize'
						placeholder='Enter serving size'
						value={serving_size}
						onChange={(e) => setServingSize(e.target.value)}
					/>
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='ingredients'>Ingredients: </label>
					<textarea
						rows='10'
						name='ingredients'
						placeholder='Enter ingredients, separated by commas'
						value={ingredients}
						onChange={(e) => setIngredients(e.target.value)}
					/>
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='directions'>Directions: </label>
					<textarea
						rows='10'
						name='directions'
						placeholder='Enter directions, separated by commas'
						value={directions}
						onChange={(e) => setDirections(e.target.value)}
					/>
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='imageUrl'>Image URL: </label>
					<input
						name='imageUrl'
						placeholder='Optional - paste image URL here'
						value={image_url}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</div>

				<div className='createRecipeButtonContainer'>
					<Link to='/' className='backLink'>
						<button type='button' className='btnSecondary'>
							Cancel
						</button>
					</Link>
					<button type='button' className='btnMain' onClick={saveRecipe}>
						Save
					</button>
				</div>
			</article>
		</section>
	);
};

export default withRouter(CreateRecipe);
