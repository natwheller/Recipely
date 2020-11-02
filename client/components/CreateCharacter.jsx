import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

// requiring json data for use in dropdown and checkboxes
const speciesData = require('../data/species.json');
const planetsData = require('../data/planets.json');
const filmsData = require('../data/films.json');

// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

const CreateCharacter = props => {
  const [ name, nameOnChange ] = useInput('');
  const [ gender, genderOnChange ] = useInput('');
  const [ birth_year, birthYearOnChange ] = useInput('');
  const [ eye_color, eyeColorOnChange ] = useInput('');
  const [ skin_color, skinColorOnChange ] = useInput('');
  const [ hair_color, hairColorOnChange ] = useInput('');
  const [ mass, massOnChange ] = useInput('');
  const [ height, heightOnChange ] = useInput('');
  const [ species, setSpecies ] = useState(speciesData[0].name);
  const [ species_id, setSpeciesId ] = useState(speciesData[0]._id);
  const [ homeworld, setHomeworld ] = useState(planetsData[0].name);
  const [ homeworld_id, setHomeworldId ] = useState(planetsData[0]._id);
  const [ filmSet, setFilmSet ] = useState({});
  const [ nameError, setNameError ] = useState(null);
  const [ heightError, setHeightError ] = useState(null);

  const handleSpeciesChange = e => {
    const idx = e.target.value;
    setSpecies(speciesData[idx].name);
    setSpeciesId(speciesData[idx]._id);
  };

  const handleHomeworldChange = e => {
    const idx = e.target.value;
    setHomeworld(planetsData[idx].name);
    setHomeworldId(planetsData[idx]._id);
  };

  const handleFilmCheck = e => {
    const idx = e.target.value;
    const newFilmSet = {...filmSet};
    if (newFilmSet[idx]) delete newFilmSet[idx];
    else newFilmSet[idx] = true;
    setFilmSet(newFilmSet);
  };

  const saveCharacter = () => {
    // check if name is empty
    if (name === '') {
      setNameError('required');
    // check if height is not a number
    } else if(isNaN(height)){
      setHeightError('must be a number');
    } else {
      const films = [];
      for (const idx in filmSet) {
        films.push({
          title: filmsData[idx].title,
          id: filmsData[idx]._id
        });
      }
      const body = {
        name,
        gender,
        species,
        species_id,
        birth_year,
        eye_color,
        skin_color,
        hair_color,
        mass,
        height: parseInt(height),
        homeworld,
        homeworld_id,
        films
      };
      fetch('/api/character', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then(data => {
          props.history.push('/');
        })
        .catch(err => console.log('CreateCharacter fetch /api/character: ERROR: ', err));
    }
  };

  // useEffect to clear nameError when `name` is changed
  useEffect(()=>{
    setNameError(null);
  }, [name]);

  // useEffect to clear heightError when `height` is changed
  useEffect(()=>{
    setHeightError(null);
  }, [height]);

  const speciesOptions = speciesData.map((speciesObj, idx) => {
    return (
      <option key={idx} value={idx}>{speciesObj.name}</option>
    );
  });

  const homeworldOptions = planetsData.map((planetObj, idx) => {
    return (
      <option key={idx} value={idx}>{planetObj.name}</option>
    );
  });
  
  const filmCheckboxes = filmsData.map((filmObj, idx) => {
    return (
      <div key={idx} className="checkboxWithLabel">
        <input type="checkbox" className="filmCheckbox" value={idx} onChange={handleFilmCheck}></input>
        <span className="checkboxLabel">{filmObj.title}</span>
      </div>
    );
  });

  return (
    <section className="mainSection createCharContainer">
      <header className="pageHeader">
        <h2>Character Creator</h2>
        <Link to="/" className="backLink">
          <button type="button" className="btnSecondary">
              Back to all characters
          </button>
        </Link>
      </header>
      <article className="card createChar">
        <h3>Enter your character details</h3>
        <div className="createCharFields">
          <label htmlFor="name">Name: </label>
          <input name="name" placeholder="Luke Skywalker" value={name} onChange={nameOnChange} />
          {nameError ? (<span className="errorMsg">{nameError}</span>) : null}
        </div>
        <div className="createCharFields">
          <label htmlFor="gender">Gender: </label>
          <input name="gender" placeholder="Male" value={gender} onChange={genderOnChange} />
        </div>
        <div className="createCharFields">
          <label htmlFor="species">Species: </label>
          <select name="species" id="species-select" onChange={handleSpeciesChange}>
            {speciesOptions}
          </select>
        </div>
        <div className="createCharFields">
          <label htmlFor="birthYear">Birth Year: </label>
          <input name="birthYear" placeholder="19BBY" value={birth_year} onChange={birthYearOnChange} />
        </div>
        <div className="createCharFields">
          <label htmlFor="eyeColor">Eye Color: </label>
          <input name="eyeColor" placeholder="blue" value={eye_color} onChange={eyeColorOnChange} />
        </div>
        <div className="createCharFields">
          <label htmlFor="skinColor">Skin Color: </label>
          <input name="skinColor" placeholder="fair" value={skin_color} onChange={skinColorOnChange} />
        </div>
        <div className="createCharFields">
          <label htmlFor="hairColor">Hair Color: </label>
          <input name="hairColor" placeholder="blond" value={hair_color} onChange={hairColorOnChange} />
        </div>
        <div className="createCharFields">
          <label htmlFor="mass">Mass: </label>
          <input name="mass" placeholder="77" value={mass} onChange={massOnChange} />
        </div>
        <div className="createCharFields">
          <label htmlFor="height">Height: </label>
          <input name="height" placeholder="172" value={height} onChange={heightOnChange} />
          {heightError ? (<span className="errorMsg">{heightError}</span>) : null}
        </div>
        <div className="createCharFields">
          <label htmlFor="homeworld">Homeworld: </label>
          <select name="homeworld" onChange={handleHomeworldChange}>
            {homeworldOptions}
          </select>
        </div>
        <div className="createCharFields">
          <label htmlFor="films">Films: </label>
          <div className="filmCheckboxContainer">
            {filmCheckboxes}
          </div>
        </div>
        <div className="createCharButtonContainer">
          <Link to="/" className="backLink">
            <button type="button" className="btnSecondary">
              Cancel
            </button>
          </Link>
          <button type="button" className="btnMain" onClick={saveCharacter}>Save</button>
        </div>
      </article>
    </section>
  );
};

export default withRouter(CreateCharacter);