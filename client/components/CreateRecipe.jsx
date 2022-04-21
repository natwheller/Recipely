import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Custom hook for handling input boxes
const useInput = (init) => {
	// default state value is set to initial value
	const [value, setValue] = useState(init);
	// on change it updates to the target value
	const onChange = (e) => {
		setValue(e.target.value);
	};
	// return the value with the onChange function instead of setValue function
	return [value, onChange];
};

// passing down props
const CreateRecipe = (props) => {
	const [name, nameOnChange] = useInput('');
	const [prep_time, prepTimeOnChange] = useInput('');
	const [cook_time, cookTimeOnChange] = useInput('');
	const [serving_size, servingSizeOnChange] = useInput('');
	const [image_url, imageUrlOnChange] = useInput('');
	const [ingredients, ingredientsOnChange] = useInput('');
	const [directions, directionsOnChange] = useInput('');
	const [nameError, setNameError] = useState(null);

	const saveRecipe = () => {
		// check if any are empty
		if (name === '') setNameError('required');
		if (prep_time === '') setNameError('required');
		if (cook_time === '') setNameError('required');
		if (serving_size === '') setNameError('required');
		if (ingredients === '') setNameError('required');
		if (directions === '') setNameError('required');

		const body = {
			name,
			prep_time,
			cook_time,
			serving_size,
			image_url,
			ingredients,
			directions,
		};

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
	};
	// useEffect to clear nameError when `name` is changed
	useEffect(() => {
		setNameError(null);
	}, [name, prep_time, cook_time, serving_size, ingredients, directions]);

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
						onChange={nameOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='preptime'>Prep Time: </label>
					<input
						name='prepTime'
						placeholder='Enter prep time'
						value={prep_time}
						onChange={prepTimeOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='cooktime'>Cook Time: </label>
					<input
						name='cookTime'
						placeholder='Enter cook time'
						value={cook_time}
						onChange={cookTimeOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='servingsize'>Serving Size: </label>
					<input
						name='servingSize'
						placeholder='Enter serving size'
						value={serving_size}
						onChange={servingSizeOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='ingredients'>Ingredients: </label>
					<textarea
						rows='10'
						name='ingredients'
						placeholder='Enter ingredients, separated by commas'
						value={ingredients}
						onChange={ingredientsOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='directions'>Directions: </label>
					<textarea
						rows='10'
						name='directions'
						placeholder='Enter directions, separated by commas'
						value={directions}
						onChange={directionsOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				<div className='createRecipeFields'>
					<label htmlFor='imageUrl'>Image URL: </label>
					<input
						name='imageUrl'
						placeholder='Optional - paste image URL here'
						value={image_url}
						onChange={imageUrlOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>

				{/* add photo upload here */}

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
