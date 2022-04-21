const { query } = require('express');
const db = require('../models/recipeModel');
const fs = require('fs/promises');
const path = require('path');

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
		console.log(dbQuery.rows + `console log dbquery`);
		res.locals.getIngredients = dbQuery.rows[0];
		// console.log(res.locals.getIngredients);
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
		// console.log(dbQuery.rows[0]);
		res.locals.getDirections = dbQuery.rows[0];
		// console.log(res.locals.getDirections);
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

recipeController.addRecipe = async (req, res, next) => {
	const text =
		'INSERT INTO recipes (name, prep_time, cook_time, serving_size, image_URL) VALUES($1, $2, $3, $4, $5)';

	// console.log(req.body);
	const { name, prep_time, cook_time, serving_size, image_url } = req.body;

	const values = [name, prep_time, cook_time, serving_size, image_url];

	const newRecipe = {
		name: name,
		prep_time: prep_time,
		cook_time: cook_time,
		serving_size: serving_size,
		image_url: image_url,
	};

	try {
		await db.query(text, values);
		res.locals.addRecipe = newRecipe;
		console.log(res.locals.addRecipe);
		return next();
	} catch (err) {
		return next({
			log: `recipeController.addIngredients: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in recipeController.addIngredients. See server log for details.',
		});
	}
};

recipeController.addIngredients = async (req, res, next) => {
	const text =
		'INSERT INTO ingredients (one, two, three, four, five, six, seven, eight, nine, ten) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
	// console.log(req.body);

	const reqStr = req.body.ingredients;
	const ingredients = reqStr.split(', ');
	console.log(ingredients);

	const values = [
		ingredients[0],
		ingredients[1],
		ingredients[2],
		ingredients[3],
		ingredients[4],
		ingredients[5],
		ingredients[6],
		ingredients[7],
		ingredients[8],
		ingredients[9],
	];

	const newIngredients = {
		i_one: ingredients[0],
		i_two: ingredients[1],
		i_three: ingredients[2],
		i_four: ingredients[3],
		i_five: ingredients[4],
		i_six: ingredients[5],
		i_seven: ingredients[6],
		i_eight: ingredients[7],
		i_nine: ingredients[8],
		i_ten: ingredients[9],
	};
	try {
		await db.query(text, values);
		// we can see this went into the ingredients array in postman
		// post into ingredients is working!!!
		res.locals.addIngredients = newIngredients;
		console.log(res.locals.addIngredients);
		return next();
	} catch (err) {
		return next({
			log: `recipeController.addIngredients: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in recipeController.addIngredients. See server log for details.',
		});
	}
};

recipeController.addDirections = async (req, res, next) => {
	const text =
		'INSERT INTO directions (one_d, two_d, three_d, four_d, five_d, six_d, seven_d, eight_d, nine_d, ten_d) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

	// console.log(req.body);

	const reqStr = req.body.directions;
	const directions = reqStr.split(', ');
	console.log(directions);

	const values = [
		directions[0],
		directions[1],
		directions[2],
		directions[3],
		directions[4],
		directions[5],
		directions[6],
		directions[7],
		directions[8],
		directions[9],
	];

	const newDirections = {
		one_d: directions[0],
		two_d: directions[1],
		three_d: directions[2],
		four_d: directions[3],
		five_d: directions[4],
		six_d: directions[5],
		seven_d: directions[6],
		eight_d: directions[7],
		nine_d: directions[8],
		ten_d: directions[9],
	};
	try {
		await db.query(text, values);
		// we can see this went into the directions array in postman
		// post into directions is working!!!
		res.locals.addDirections = newDirections;
		console.log(res.locals.addDirections);
		return next();
	} catch (err) {
		return next({
			log: `recipeController.addDirections: ERROR ${
				typeof err === 'object' ? JSON.stringify(err) : err
			}`,
			message:
				'Error occured in recipeController.addDirections. See server log for details.',
		});
	}
};

module.exports = recipeController;
