const User = require('../Model/userModel');

// @desc    Add recipe to favorites
// @route   POST /api/favorites/:recipeId
// @access  Private
const addToFavorites = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId);
        
        if (!user.favoriteRecipes.includes(recipeId)) {
            user.favoriteRecipes.push(recipeId);
            await user.save();
        }

        res.json({ message: 'Recipe added to favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Remove recipe from favorites
// @route   DELETE /api/favorites/:recipeId
// @access  Private
const removeFromFavorites = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId);
        user.favoriteRecipes = user.favoriteRecipes.filter(
            id => id.toString() !== recipeId
        );
        await user.save();

        res.json({ message: 'Recipe removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user's favorite recipes
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favoriteRecipes');
        res.json(user.favoriteRecipes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
};