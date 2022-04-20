const express = require('express');

const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.get('/', recipeController.getRecipes, (req, res) =>
	res.status(200).json(res.locals.getRecipes)
);

router.get('/ingredients', recipeController.getIngredients, (req, res) =>
	res.status(200).json(res.locals.getIngredients)
);
// http://localhost:8080/api/ingredients?id=1

router.get('/directions', recipeController.getDirections, (req, res) =>
	res.status(200).json(res.locals.getDirections)
);
// http://localhost:8080/api/directions?id=1

// router.post('/recipe', recipeController.addRecipe, (req, res) =>
// 	res.status(200).json()
// );

// need to add update recipe

// need to add delete recipe

module.exports = router;
