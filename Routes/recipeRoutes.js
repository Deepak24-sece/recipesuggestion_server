const express = require('express');
const router = express.Router();
const { getRecipes, createRecipe } = require('../Controller/recipeController');

router.get('/', getRecipes);
router.post('/', createRecipe);

module.exports = router;
