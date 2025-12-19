const express = require('express');
const router = express.Router();
const { addToFavorites, removeFromFavorites, getFavorites } = require('../Controller/favoritesController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getFavorites);
router.post('/:recipeId', protect, addToFavorites);
router.delete('/:recipeId', protect, removeFromFavorites);

module.exports = router;