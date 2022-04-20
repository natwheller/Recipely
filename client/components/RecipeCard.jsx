import React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ info, openModal }) => {
	const { name, recipe_id, prep_time, cook_time, serving_size, image_url } =
		info;

	// this is what shows us the additional details when you click on the Q marks
	// e is the click event, type is the category on the card, id is the id
	const openDetailsModal = (e, type, id) => {
		const top = e.pageY + 10;
		const left = e.pageX + 10;
		openModal(type, { top, left }, id);
	};

	return (
		<article className='card charCard'>
			<div className='charHeadContainer'>
				<h3 className='charName'>{name}</h3>
			</div>
			<img src={image_url} width='250' height='250'></img>
			<ul className='charDetailsList'>
				<li className='charDetail'>
					<b>Prep Time: </b>
					{prep_time}
				</li>
				<li className='charDetail'>
					<b>Cook Time: </b>
					{cook_time}
				</li>
				<li className='charDetail'>
					<b>Serving Size: </b>
					{serving_size}
				</li>
				<li className='charDetail'>
					<b>Ingredients: </b>Click for more...
					<span className='icon'>
						<FAIcon
							icon={faUtensils}
							size='s'
							style={{ color: 'purple' }}
							onClick={(e) => openDetailsModal(e, 'ingredients', recipe_id)}
						/>
					</span>
				</li>
				<li className='charDetail'>
					<b>Directions: </b>Click for more...
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
