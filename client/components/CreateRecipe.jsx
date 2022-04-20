import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

// requiring json data for use in dropdown and checkboxes
const speciesData = require('../data/species.json');
const planetsData = require('../data/planets.json');

// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = (init) => {
	const [value, setValue] = useState(init);
	const onChange = (e) => {
		setValue(e.target.value);
	};
	// return the value with the onChange function instead of setValue function
	return [value, onChange];
};

const CreateRecipe = (props) => {
	const [name, nameOnChange] = useInput('');
	const [prep_time, prepTimeOnChange] = useInput('');
	const [cook_time, cookTimeOnChange] = useInput('');
	const [serving_size, servingSizeOnChange] = useInput('');
	const [image_url, imageUrlOnChange] = useInput('');
	// add input fields for directions and ingredients
	const [species, setSpecies] = useState(speciesData[0].name);
	const [species_id, setSpeciesId] = useState(speciesData[0]._id);
	const [homeworld, setHomeworld] = useState(planetsData[0].name);
	const [homeworld_id, setHomeworldId] = useState(planetsData[0]._id);
	const [nameError, setNameError] = useState(null);

	const handleSpeciesChange = (e) => {
		const idx = e.target.value;
		setSpecies(speciesData[idx].name);
		setSpeciesId(speciesData[idx]._id);
	};

	const handleHomeworldChange = (e) => {
		const idx = e.target.value;
		setHomeworld(planetsData[idx].name);
		setHomeworldId(planetsData[idx]._id);
	};

	const saveRecipe = () => {
		// check if name is empty
		if (name === '') setNameError('required');
		if (prep_time === '') setNameError('required');
		if (cook_time === '') setNameError('required');
		if (serving_size === '') setNameError('required');

		const body = {
			name,
			prep_time,
			cook_time,
			serving_size,
			image_url,
			species,
			species_id,
			homeworld,
			homeworld_id,
			//need to add ingredients and directions here
		};

		fetch('/api/recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
			},
			body: JSON.stringify(body),
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
			})
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
	}, [name, prep_time, cook_time, serving_size]);

	const speciesOptions = speciesData.map((speciesObj, idx) => {
		return (
			<option key={idx} value={idx}>
				{speciesObj.name}
			</option>
		);
	});

	const homeworldOptions = planetsData.map((planetObj, idx) => {
		return (
			<option key={idx} value={idx}>
				{planetObj.name}
			</option>
		);
	});

	return (
		<section className='mainSection createCharContainer'>
			<header className='pageHeader'>
				<h2>Recipe Creator</h2>
				<Link to='/' className='backLink'>
					<button type='button' className='btnSecondary'>
						Back to all recipes
					</button>
				</Link>
			</header>
			<article className='card createChar'>
				<h3>Enter your recipe details</h3>
				<div className='createCharFields'>
					<label htmlFor='name'>Name: </label>
					<input
						name='name'
						placeholder='Peanut Butter & Jelly'
						value={name}
						onChange={nameOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				<div className='createCharFields'>
					<label htmlFor='preptime'>Prep Time: </label>
					<input
						name='prepTime'
						placeholder='30 minutes'
						value={prep_time}
						onChange={prepTimeOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				{/* add text areas here for ingredients and instructions */}

				<div className='createCharFields'>
					<label htmlFor='cooktime'>Cook Time: </label>
					<input
						name='cookTime'
						placeholder='30 minutes'
						value={cook_time}
						onChange={cookTimeOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>
				<div className='createCharFields'>
					<label htmlFor='servingsize'>Serving Size: </label>
					<input
						name='servingSize'
						placeholder='1'
						value={serving_size}
						onChange={servingSizeOnChange}
					/>
					{nameError ? <span className='errorMsg'>{nameError}</span> : null}
				</div>

				<div className='createCharFields'>
					<label htmlFor='homeworld'>Ingredients: </label>
					<select name='homeworld' onChange={handleHomeworldChange}>
						{homeworldOptions}
					</select>
				</div>
				<div className='createCharFields'>
					<label htmlFor='species'>Directions: </label>
					<select
						name='species'
						id='species-select'
						onChange={handleSpeciesChange}
					>
						{speciesOptions}
					</select>
				</div>

				{/* add photo upload here */}

				<div className='createCharButtonContainer'>
					<Link to='/' className='backLink'>
						<button type='button' className='btnSecondary'>
							Cancel
						</button>
					</Link>
					<button type='button' className='btnMain' onClick={saveRecipe}>
						Save
						{/* make sure this captures all the new fields you add */}
					</button>
				</div>
			</article>
		</section>
	);
};

export default withRouter(CreateRecipe);
