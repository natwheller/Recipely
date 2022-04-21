const express = require('express');

const recipeController = require('../controllers/recipeController');

const router = express.Router();

const fs = require('fs/promises');
// require('fs').promises

const path = require('path');
const { stringify } = require('querystring');

router.get('/', recipeController.getRecipes, (req, res) =>
	res.status(200).json(res.locals.getRecipes)
);
// http://localhost:8080/api/

router.get('/ingredients', recipeController.getIngredients, (req, res) => {
	console.log('server' + res.locals.getIngredients);
	res.status(200).json(res.locals.getIngredients);
});
// http://localhost:8080/api/ingredients?id=1

router.get('/directions', recipeController.getDirections, (req, res) =>
	res.status(200).json(res.locals.getDirections)
);
// http://localhost:8080/api/directions?id=1

router.post(
	'/recipe',
	recipeController.addRecipe,
	recipeController.addIngredients,
	recipeController.addDirections,
	(req, res) => {
		res.status(200).json({
			recipe: res.locals.addRecipe,
			ingredients: res.locals.addIngredients,
			directions: res.locals.addDirections,
		});
	}
);

// need to add update recipe

// need to add delete recipe

module.exports = router;
