/* eslint-disable indent */
const { query } = require('express');
const db = require('../models/starWarsModels');

const starWarsController = {};

starWarsController.getCharacters = async (req, res, next) => {
	try {
		//SQL reads right to left
		//reading first FROM adding tables horizontally from people, species & planets
		//lastly we're saying SELECT all of people's columns, species name, and planet name (these are the things we wanna join)
		//we have to re-name (give aliases) since there are matching/shared keys (name key)
		// AS means this is the name the column will have once it's merged into the people table
		const sqlString = `SELECT p.*, s.name AS species, h.name AS homeworld
      FROM people p 
      LEFT OUTER JOIN species s 
      ON s._id = p.species_id
      LEFT OUTER JOIN planets h
      ON h._id = p.homeworld_id`;
		// search the database with the above instructions and store the data into dbQuery var
		const dbQuery = await db.query(sqlString);
		console.log(dbQuery);
		// store the result.rows into res.locals
		// we know the key is 'rows' because we logged the dbQuery
		res.locals.getCharacters = await dbQuery.rows;
		return next();
	} catch (err) {
		return next({
			log: `starWarsController.getCharacters: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in starWarsController.getCharacters. See server log for details.',
		});
	}
};
//classification, average_height, average_lifespan, language, name, and homeworld
starWarsController.getSpecies = async (req, res, next) => {
	//WHERE has to be nested so we can get a table and then do LEFT OUTER JOIN
	try {
		const queryStr = `SELECT species.*, p.name AS homeworld 
    FROM (SELECT * FROM species WHERE species._id = ${req.query.id}) species
    LEFT OUTER JOIN planets p
    ON p._id = species.homeworld_id`;
		// SELECT all columns from species, rename planets.name to 'homeworld'
		// FROM (create a table with all columns from species, where the species id= the species id in the request)
		// JOIN this with the planets table
		// on the condition that the planets id = the species.homeworld id
		// we're trying to make sure homeworld gets added into the species table bc right now we only have homeworld id
		const dbQuery = await db.query(queryStr);
		console.log(dbQuery);
		res.locals.getSpecies = dbQuery.rows[0];
		// rows at index 0 bc there will only be 1 object
		return next();
	} catch (err) {
		return next({
			log: `starWarsController.getSpecies: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in starWarsController.getSpecies. See server log for details.',
		});
	}
};

starWarsController.getHomeworld = async (req, res, next) => {
	// write code here
	try {
		const queryStr = `SELECT planets.*
    FROM planets
    WHERE planets._id = ${req.query.id}`;
		// SELECT all columns from the planets table where the planets id = the planets id in the request
		const dbQuery = await db.query(queryStr);
		// console.log(dbQuery);
		res.locals.getHomeworld = dbQuery.rows[0];
		return next();
	} catch (err) {
		return next({
			log: `starWarsController.getHomeworld: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in starWarsController.getHomeworld. See server log for details.',
		});
	}
};

starWarsController.getFilm = (req, res, next) => {
	// write code here

	next();
};

starWarsController.addCharacter = async (req, res, next) => {
	const text =
		'INSERT INTO people (name, gender, species_id, birth_year, eye_color, hair_color, mass, height, homeworld_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
	const values = [
		req.body.name,
		req.body.gender,
		req.body.species_id,
		req.body.birth_year,
		req.body.eye_color,
		req.body.hair_color,
		req.body.mass,
		req.body.height,
		req.body.homeworld_id,
	];
	db.query(text, values)
		.then(console.log(values))
		.then(next())
		.catch((err) => console.log(err));
};

module.exports = starWarsController;
