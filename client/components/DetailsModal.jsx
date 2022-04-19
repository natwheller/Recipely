import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const RecipesModal = ({ type, position, id, closeModal }) => {
	const [details, setDetails] = useState({});
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		if (id) {
			setIsFetching(true);
			// need to link this type - ingredients/directions and id=recipeid
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

	if (isFetching) {
		return (
			<div className='modal' style={position}>
				<p>Fetching data...</p>
			</div>
		);
	}

	let info;
	switch (type) {
		case 'ingredients':
			const { one, two, three, four, five, six, seven, eight, nine, ten } =
				details;
			info = (
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
			);
			break;
		// case 'homeworld':
		// 	const {
		// 		rotation_period,
		// 		orbital_period,
		// 		diameter,
		// 		climate,
		// 		gravity,
		// 		terrain,
		// 		surface_water,
		// 		population,
		// 	} = details;
		// 	info = (
		// we can make this one an ol
		// 		<ul className='modalList'>
		// 			<li className='modalDetail'>1: {rotation_period}</li>
		// 			<li className='modalDetail'>2: {orbital_period}</li>
		// 			<li className='modalDetail'>3: {diameter}</li>
		// 			<li className='modalDetail'>4: {climate}</li>
		// 			<li className='modalDetail'>5: {gravity}</li>
		// 			<li className='modalDetail'>6: {terrain}</li>
		// 			<li className='modalDetail'>7: {surface_water}</li>
		// 			<li className='modalDetail'>8: {population}</li>
		// 			<li className='modalDetail'>9: {population}</li>
		// 			<li className='modalDetail'>10: {population}</li>
		// 		</ul>
		// 	);
		// 	break;

		default:
			info = <p>Unexpected modal type</p>;
	}

	return (
		<div className='modal' style={position}>
			<div className='modalHeading'>
				<h4 className='modalName'>Ingredients</h4>
				<FAIcon icon={faTimes} onClick={closeModal} />
			</div>
			{info}
		</div>
	);
};

export default RecipesModal;
