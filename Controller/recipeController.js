const Recipe = require('../Model/recipeModel');

// @desc    Get all recipes or search by ingredients
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res) => {
    try {
        const { ingredient, ingredients, cookingTime } = req.query;
        let query = {};

        // Handle multiple ingredients search
        if (ingredients) {
            const ingredientList = ingredients.split(',').map(ing => ing.trim());
            query.ingredients = {
                $all: ingredientList.map(ing => new RegExp(ing, 'i'))
            };
        } else if (ingredient) {
            // Single ingredient search
            query.ingredients = { $regex: ingredient, $options: 'i' };
        }

        // Handle cooking time filter
        if (cookingTime) {
            if (cookingTime === 'quick') {
                query.cookingTime = { $lte: 15 };
            } else if (cookingTime === 'medium') {
                query.cookingTime = { $gt: 15, $lte: 60 };
            } else if (cookingTime === 'long') {
                query.cookingTime = { $gt: 60 };
            }
        }

        const recipes = await Recipe.find(query);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Public
const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, image } = req.body;

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            image
        });

        res.status(201).json(recipe);

    } catch (error) {
        res.status(400).json({ message: 'Invalid recipe data' });
    }
}

module.exports = {
    getRecipes,
    createRecipe
};
