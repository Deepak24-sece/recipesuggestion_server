const Admin = require('../Model/adminModel');
const Recipe = require('../Model/recipeModel');
const jwt = require('jsonwebtoken');

// Generate JWT Token for admin
const generateToken = (id) => {
    return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
    try {
        const { password } = req.body;

        // Simple password check - no database needed
        if (password === '1234') {
            const token = generateToken('admin123');
            res.json({
                _id: 'admin123',
                username: 'admin',
                token: token,
                role: 'admin'
            });
        } else {
            res.status(400).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Admin Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add new recipe
// @route   POST /api/admin/recipes
// @access  Private (Admin only)
const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, cookingTime, servings } = req.body;

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const recipe = await Recipe.create({
            title,
            ingredients: ingredients.split(',').map(ing => ing.trim()),
            instructions,
            cookingTime: cookingTime || 30,
            servings: servings || 4
        });

        res.status(201).json(recipe);
    } catch (error) {
        console.error('Admin Add Recipe Error:', error);
        res.status(400).json({ message: 'Error creating recipe' });
    }
};

// @desc    Update recipe
// @route   PUT /api/admin/recipes/:id
// @access  Private (Admin only)
const updateRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, cookingTime, servings } = req.body;

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        recipe.title = title || recipe.title;
        recipe.ingredients = ingredients ? ingredients.split(',').map(ing => ing.trim()) : recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;
        recipe.cookingTime = cookingTime || recipe.cookingTime;
        recipe.servings = servings || recipe.servings;

        const updatedRecipe = await recipe.save();
        res.json(updatedRecipe);
    } catch (error) {
        console.error('Admin Update Recipe Error:', error);
        res.status(400).json({ message: 'Error updating recipe' });
    }
};

// @desc    Delete recipe
// @route   DELETE /api/admin/recipes/:id
// @access  Private (Admin only)
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Admin Delete Recipe Error:', error);
        res.status(400).json({ message: 'Error deleting recipe' });
    }
};

// @desc    Get all recipes for admin
// @route   GET /api/admin/recipes
// @access  Private (Admin only)
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({}).sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        console.error('Admin Get Recipes Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    adminLogin,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getAllRecipes,
};