const mongoose = require('mongoose');
const Recipe = require('./Model/recipeModel');
require('dotenv').config();

const countRecipes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await Recipe.countDocuments();
        console.log(`Total recipes in database: ${count}`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

countRecipes();