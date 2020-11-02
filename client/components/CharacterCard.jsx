import React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

const CharacterCard = ({
  info, openModal
}) => {
  const {
    name, gender, species, birth_year, eye_color, skin_color,
    hair_color, mass, height, homeworld, films = [], species_id, homeworld_id
  } = info;

  const filmData = films.map((film, i) => (
    <li key={i} className="charFilm">
      - {film.title} <span className="icon"><FAIcon icon={faQuestionCircle} size="xs" style={{color: 'steelBlue'}} onClick={e => openDetailsModal(e, 'film', film.id)} /></span>
    </li>
  ));

  const openDetailsModal = (e, type, id) => {
    const top = e.pageY;
    const left = e.pageX;
    openModal(type, { top, left }, id);
  };

  return (
    <article className="card charCard">
      <div className="charHeadContainer">
        <h3 className="charName">{name}</h3>
      </div>
      <ul className="charDetailsList">
        <li className="charDetail">Gender: {gender}</li>
        <li className="charDetail">Species: {species} <span className="icon"><FAIcon icon={faQuestionCircle} size="xs" style={{color: 'steelBlue'}} onClick={e => openDetailsModal(e, 'species', species_id)} /></span></li>
        <li className="charDetail">Birth Year: {birth_year}</li>
        <li className="charDetail">Eye Color: {eye_color}</li>
        <li className="charDetail">Skin Color: {skin_color}</li>
        <li className="charDetail">Hair Color: {hair_color}</li>
        <li className="charDetail">Mass: {mass}</li>
        <li className="charDetail">Height: {height}</li>
        <li className="charDetail">Homeworld: {homeworld} <span className="icon"><FAIcon icon={faQuestionCircle} size="xs" style={{color: 'steelBlue'}} onClick={e => openDetailsModal(e, 'homeworld', homeworld_id)} /></span></li>
        <p className="charAddlDetail">Films:</p>
        <ul className="charFilmsList">{filmData}</ul>
      </ul>
    </article>
  );
};

export default CharacterCard;
