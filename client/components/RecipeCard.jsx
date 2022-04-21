import React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

// passing in info and openModal function from Recipes component
const RecipeCard = ({ info, openModal }) => {
	// destructuring props on info object
	const { name, recipe_id, prep_time, cook_time, serving_size, image_url } =
		info;

	// this is what shows us the additional details when you click on the utensils
	// e is the click event, type is the category on the card, id is the id
	// this gets invoked on click
	const openDetailsModal = (e, type, id) => {
		const top = e.pageY + 10;
		const left = e.pageX + 10;
		openModal(type, { top, left }, id);
	};
	// this is where we render the main cards with all their attributes
	// modal details (ingredients and instructions) get rendered on DetailsModal
	return (
		<article className='card recipeCard'>
			<div className='recipeHeadContainer'>
				<h3 className='recipeName'>{name}</h3>
			</div>
			<img src={image_url} width='250' height='250'></img>
			<ul className='recipeDetailsList'>
				<li className='recipeDetail'>
					<b>Prep Time: </b>
					{prep_time}
				</li>
				<li className='recipeDetail'>
					<b>Cook Time: </b>
					{cook_time}
				</li>
				<li className='recipeDetail'>
					<b>Serving Size: </b>
					{serving_size}
				</li>
				<li className='recipeDetail'>
					<b>Ingredients: </b>See more...
					<span className='icon'>
						<FAIcon
							icon={faUtensils}
							size='s'
							style={{ color: 'purple' }}
							onClick={(e) => openDetailsModal(e, 'ingredients', recipe_id)}
						/>
					</span>
				</li>
				<li className='recipeDetail'>
					<b>Directions: </b>See more...
					<span className='icon'>
						<FAIcon
							icon={faUtensils}
							size='s'
							style={{ color: 'steelBlue' }}
							onClick={(e) => openDetailsModal(e, 'directions', recipe_id)}
						/>
					</span>
				</li>
			</ul>
		</article>
	);
};

export default RecipeCard;
