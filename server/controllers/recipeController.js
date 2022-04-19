/* eslint-disable indent */
const { query } = require('express');
const db = require('../models/recipeModel');

const recipeController = {};

recipeController.getRecipes = async (req, res, next) => {
	try {
		const sql = `SELECT * FROM recipes`;

		// `SELECT to_json(res) FROM
		// (
		// SELECT r.*, to_json(i) "ingredients"
		// FROM recipes r
		// INNER JOIN ingredients i
		// ON r.recipe_id = i.recipe_id
		// ) res;`;

		const dbQuery = await db.query(sql);
		console.log(dbQuery.rows);
		res.locals.getRecipes = await dbQuery.rows;
		return next();
	} catch (err) {
		return next({
			log: `recipeController.getRecipes: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in recipeController.getRecipes. See server log for details.',
		});
	}
};

recipeController.getIngredients = async (req, res, next) => {
	try {
		const queryStr =
			//     `SELECT species.*, p.name AS homeworld
			//     FROM (SELECT * FROM species WHERE species._id = ${req.query.id}) species
			//     LEFT OUTER JOIN planets p
			//     ON p._id = species.homeworld_id`;
			`SELECT * FROM ingredients
			WHERE recipe_id = ${req.query.id}`;

		const dbQuery = await db.query(queryStr);
		// console.log(dbQuery);
		res.locals.getIngredients = dbQuery.rows[0];
		console.log(dbQuery.rows[0]);
		return next();
	} catch (err) {
		return next({
			log: `recipeController.getIngredients: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in recipeController.getIngredients. See server log for details.',
		});
	}
};

// starWarsController.getHomeworld = async (req, res, next) => {
// 	// write code here
// 	try {
// 		const queryStr = `SELECT planets.*
//     FROM planets
//     WHERE planets._id = ${req.query.id}`;
// 		// SELECT all columns from the planets table where the planets id = the planets id in the request
// 		const dbQuery = await db.query(queryStr);
// 		// console.log(dbQuery);
// 		res.locals.getHomeworld = dbQuery.rows[0];
// 		return next();
// 	} catch (err) {
// 		return next({
// 			log: `starWarsController.getHomeworld: ERROR ${
// 				typeof err === 'object' ? JSON.stringify(err) : err
// 			}`,
// 			message:
// 				'Error occured in starWarsController.getHomeworld. See server log for details.',
// 		});
// 	}
// };

// starWarsController.addCharacter = async (req, res, next) => {
// 	const text =
// 		'INSERT INTO people (name, gender, species_id, birth_year, eye_color, hair_color, mass, height, homeworld_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
// 	const values = [
// 		req.body.name,
// 		req.body.gender,
// 		req.body.species_id,
// 		req.body.birth_year,
// 		req.body.eye_color,
// 		req.body.hair_color,
// 		req.body.mass,
// 		req.body.height,
// 		req.body.homeworld_id,
// 	];
// 	db.query(text, values)
// 		.then(console.log(values))
// 		.then(next())
// 		.catch((err) => console.log(err));
// };

module.exports = recipeController;
