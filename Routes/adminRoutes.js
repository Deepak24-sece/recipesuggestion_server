const express = require('express');
const router = express.Router();
const { adminLogin, addRecipe, updateRecipe, deleteRecipe, getAllRecipes } = require('../Controller/adminController');
const { adminProtect } = require('../middleware/adminMiddleware');

router.post('/login', adminLogin);
router.get('/recipes', adminProtect, getAllRecipes);
router.post('/recipes', adminProtect, addRecipe);
router.put('/recipes/:id', adminProtect, updateRecipe);
router.delete('/recipes/:id', adminProtect, deleteRecipe);

module.exports = router;