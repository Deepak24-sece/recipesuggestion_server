const mongoose = require('mongoose');
const Recipe = require('./Model/recipeModel');
require('dotenv').config();

const updateRecipesWithCookingTime = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const recipes = await Recipe.find({});
        
        for (let recipe of recipes) {
            let cookingTime;
            
            // Assign cooking times based on recipe complexity
            if (recipe.title.includes('Biryani') || recipe.title.includes('Stew') || recipe.title.includes('Curry')) {
                cookingTime = Math.floor(Math.random() * 30) + 45; // 45-75 min
            } else if (recipe.title.includes('Salad') || recipe.title.includes('Smoothie') || recipe.title.includes('Sandwich')) {
                cookingTime = Math.floor(Math.random() * 10) + 5; // 5-15 min
            } else {
                cookingTime = Math.floor(Math.random() * 30) + 20; // 20-50 min
            }
            
            await Recipe.findByIdAndUpdate(recipe._id, { 
                cookingTime: cookingTime,
                servings: 4 
            });
        }
        
        console.log('All recipes updated with cooking times!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating recipes:', error);
        process.exit(1);
    }
};

updateRecipesWithCookingTime();