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
		// console.log(dbQuery.rows);
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
		const queryStr = `SELECT * FROM ingredients
			WHERE recipe_id = ${req.query.id}`;

		const dbQuery = await db.query(queryStr);
		// console.log(dbQuery);
		res.locals.getIngredients = dbQuery.rows[0];
		// console.log(dbQuery.rows[0]);
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

recipeController.getDirections = async (req, res, next) => {
	try {
		const queryStr = `SELECT * FROM directions
			WHERE recipe_id = ${req.query.id}`;

		const dbQuery = await db.query(queryStr);
		// console.log(dbQuery);
		res.locals.getDirections = dbQuery.rows[0];
		// console.log(dbQuery.rows[0]);
		return next();
	} catch (err) {
		return next({
			log: `recipeController.getDirections: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in recipeController.getDirections. See server log for details.',
		});
	}
};

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
