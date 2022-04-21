import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faGrinBeam, faSmile } from '@fortawesome/free-regular-svg-icons';

// this should be fine since pb&j works
// passing down props we'll need from the Recipes component
const RecipesModal = ({
	type,
	position,
	id,
	closeModal,
	ingredients,
	directions,
}) => {
	// default value here is a blank object
	const [details, setDetails] = useState({});
	// default value here is true
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		// if an id exists, setIsFetching=true and fetch the recipe data from the api
		// after we get the data, setIsFetching=false
		if (id) {
			console.log(id);
			setIsFetching(true);
			fetch(`/api/${type}?id=${id}`)
				.then((resp) => resp.json())
				.then((data) => {
					setDetails(data);
					setIsFetching(false);
				})
				.catch((err) => console.log('DetailsModal: fetch /api: ERROR: ', err));
		} else {
			setDetails({ name: 'Unavailable' });
			setIsFetching(false);
		}
	}, [id, type]);

	// this is where we render the message on modal if we're in the middle of fetching
	if (isFetching) {
		return (
			<div className='modal' style={position}>
				<p>Getting info...</p>
			</div>
		);
	}

	let info;
	console.log(type);
	switch (type) {
		case 'ingredients':
			const { one, two, three, four, five, six, seven, eight, nine, ten } =
				details;

			info = (
				<>
					<div className='modalHeading'>
						<h4 className='modalName'>Ingredients</h4>
						{/* we close modal on click */}
						<FAIcon icon={faTimes} onClick={closeModal} />
					</div>
					<ul className='modalList'>
						<li className='modalDetail'> {one}</li>
						<li className='modalDetail'> {two}</li>
						<li className='modalDetail'> {three}</li>
						<li className='modalDetail'> {four}</li>
						<li className='modalDetail'> {five}</li>
						<li className='modalDetail'> {six}</li>
						<li className='modalDetail'> {seven}</li>
						<li className='modalDetail'> {eight}</li>
						<li className='modalDetail'> {nine}</li>
						<li className='modalDetail'> {ten}</li>
					</ul>
				</>
			);
			break;
		case 'directions':
			const {
				one_d,
				two_d,
				three_d,
				four_d,
				five_d,
				six_d,
				seven_d,
				eight_d,
				nine_d,
				ten_d,
			} = details;
			info = (
				<>
					<div className='modalHeading'>
						<h4 className='modalName'>Directions</h4>
						<FAIcon icon={faTimes} onClick={closeModal} />
					</div>
					<ol className='modalList'>
						{/* conditional rendering where if item is null we don't render  */}
						{one_d ? <li className='modalDetail'>{one_d}</li> : null}
						{two_d ? <li className='modalDetail'>{two_d}</li> : null}
						{three_d ? <li className='modalDetail'>{three_d}</li> : null}
						{four_d ? <li className='modalDetail'>{four_d}</li> : null}
						{five_d ? <li className='modalDetail'>{five_d}</li> : null}
						{six_d ? <li className='modalDetail'>{six_d}</li> : null}
						{seven_d ? <li className='modalDetail'>{seven_d}</li> : null}
						{eight_d ? <li className='modalDetail'>{eight_d}</li> : null}
						{nine_d ? <li className='modalDetail'>{nine_d}</li> : null}
						{ten_d ? <li className='modalDetail'>{ten_d}</li> : null}
					</ol>
				</>
			);
			break;

		default:
			info = <p>Unable to grab info</p>;
	}

	return (
		<div className='modal' style={position}>
			{info}
		</div>
	);
};

export default RecipesModal;
