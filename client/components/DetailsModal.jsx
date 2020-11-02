import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SpeciesModal = ({ type, position, id, closeModal }) => {
  const [ details, setDetails ] = useState({});
  const [ isFetching, setIsFetching ] = useState(true);

  useEffect(()=>{
    if (id) {
      setIsFetching(true);
      fetch(`/api/${type}?id=${id}`)
        .then(resp => resp.json())
        .then(data => {
          setDetails(data);
          setIsFetching(false);
        })
        .catch(err => console.log('DetailsModal: fetch /api: ERROR: ', err));
    } else {
      setDetails({name: 'Unavailable'});
      setIsFetching(false);
    }
  }, [id, type]);

  if (isFetching) {
    return (
      <div className="modal" style={position}>
        <p>Fetching species data...</p>
      </div>
    );
  }

  let info;
  switch(type) {
  case 'species':
    const { classification, average_height, average_lifespan, language, homeworld } = details;
    info = (
      <ul className="modalList">
        <li className="modalDetail">Classification: {classification}</li>
        <li className="modalDetail">Average Height: {average_height}</li>
        <li className="modalDetail">Average Lifespan: {average_lifespan}</li>
        <li className="modalDetail">Language: {language}</li>
        <li className="modalDetail">Homeworld: {homeworld}</li>
      </ul>
    );
    break;
  case 'homeworld':
    const { rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population } = details;
    info = (
      <ul className="modalList">
        <li className="modalDetail">Rotation Period: {rotation_period}</li>
        <li className="modalDetail">Orbital Period: {orbital_period}</li>
        <li className="modalDetail">Diameter: {diameter}</li>
        <li className="modalDetail">Climate: {climate}</li>
        <li className="modalDetail">Gravity: {gravity}</li>
        <li className="modalDetail">Terrain: {terrain}</li>
        <li className="modalDetail">Surface Water: {surface_water}</li>
        <li className="modalDetail">Population: {population}</li>
      </ul>
    );
    break;
  case 'film':
    const { episode_id, director, producer, release_date } = details;
    info = (
      <ul className="modalList">
        <li className="modalDetail">Episode: {episode_id}</li>
        <li className="modalDetail">Director {director}</li>
        <li className="modalDetail">Producer: {producer}</li>
        <li className="modalDetail">Release Date: {new Date(release_date).toDateString().slice(4)}</li>
      </ul>
    );
    break;
  default:
    info = (<p>Unexpected modal type</p>);
  }

  return (
    <div className="modal" style={position}>
      <div className="modalHeading">
        <h4 className="modalName">{details.name || details.title || 'Unknown'}</h4>
        <FAIcon icon={faTimes} onClick={closeModal} />
      </div>
      {info}
    </div>
  );
};

export default SpeciesModal;