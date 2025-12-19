const mongoose = require('mongoose');
const Recipe = require('./Model/recipeModel');
require('dotenv').config();

const detailedRecipes = [
    // Indian Recipes
    {
        title: "Butter Chicken",
        ingredients: ["chicken", "butter", "tomato", "cream", "garam masala", "garlic", "ginger"],
        instructions: "• Marinate chicken pieces in yogurt, lemon juice, and spices for 2 hours\n• Heat butter in pan and cook marinated chicken until golden\n• In same pan, add minced garlic and ginger, sauté for 1 minute\n• Add tomato puree and cook for 5 minutes until thick\n• Add cream, garam masala, and cooked chicken\n• Simmer for 10 minutes until sauce coats chicken\n• Garnish with fresh coriander and serve with rice or naan",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400"
    },
    {
        title: "Biryani",
        ingredients: ["basmati rice", "chicken", "saffron", "onion", "yogurt", "mint", "coriander"],
        instructions: "• Soak basmati rice for 30 minutes, then boil with whole spices until 70% cooked\n• Marinate chicken in yogurt, red chili powder, and garam masala for 1 hour\n• Deep fry sliced onions until golden brown and crispy\n• Cook marinated chicken in heavy-bottomed pot until tender\n• Layer cooked rice over chicken, sprinkle fried onions and herbs\n• Dissolve saffron in warm milk and pour over rice\n• Cover with foil and lid, cook on high heat for 3 minutes, then low heat for 45 minutes",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400"
    },
    {
        title: "Dal Tadka",
        ingredients: ["lentils", "turmeric", "cumin", "mustard seeds", "garlic", "ginger", "tomato"],
        instructions: "• Wash and boil lentils with turmeric and salt until soft and mushy\n• Heat ghee in pan, add cumin and mustard seeds until they splutter\n• Add minced garlic, ginger, and green chilies, sauté for 1 minute\n• Add chopped tomatoes and cook until soft and pulpy\n• Pour the tempering over cooked dal and mix well\n• Add water if needed to adjust consistency\n• Garnish with fresh coriander and serve hot with rice",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400"
    },
    {
        title: "Paneer Tikka",
        ingredients: ["paneer", "yogurt", "red chili powder", "garam masala", "bell peppers", "onion"],
        instructions: "• Cut paneer, bell peppers, and onions into cubes\n• Make marinade with yogurt, red chili powder, garam masala, and salt\n• Marinate paneer and vegetables for at least 30 minutes\n• Thread marinated pieces onto skewers alternately\n• Grill in oven or on stovetop until edges are charred\n• Brush with butter or oil while grilling for extra flavor\n• Serve hot with mint chutney and sliced onions",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400"
    },
    {
        title: "Chole Bhature",
        ingredients: ["chickpeas", "flour", "yogurt", "baking powder", "onion", "tomato", "spices"],
        instructions: "• Soak chickpeas overnight, then pressure cook until soft\n• Make bhature dough with flour, yogurt, baking powder, and salt\n• Heat oil and sauté onions until golden, add ginger-garlic paste\n• Add tomatoes, chole masala, and cooked chickpeas\n• Simmer for 15 minutes until thick gravy forms\n• Roll bhature dough and deep fry until puffed and golden\n• Serve hot chole with fresh bhature and pickled onions",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400"
    },
    {
        title: "Masala Dosa",
        ingredients: ["rice", "urad dal", "potato", "mustard seeds", "curry leaves", "turmeric"],
        instructions: "• Soak rice and urad dal separately for 4-6 hours\n• Grind to smooth batter and ferment overnight\n• Boil potatoes, mash and temper with mustard seeds, curry leaves\n• Heat dosa pan and spread thin layer of batter\n• Drizzle oil around edges and cook until golden\n• Place potato filling on one side and fold dosa\n• Serve hot with coconut chutney and sambar",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400"
    },
    {
        title: "Rajma",
        ingredients: ["kidney beans", "onion", "tomato", "ginger", "garlic", "cumin", "coriander"],
        instructions: "• Soak kidney beans overnight, then pressure cook until soft\n• Heat oil and add cumin seeds, let them splutter\n• Add chopped onions and cook until golden brown\n• Add ginger-garlic paste and sauté for 2 minutes\n• Add tomatoes and cook until they break down completely\n• Add cooked rajma with cooking liquid and spices\n• Simmer for 20 minutes until thick, garnish with coriander",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400"
    },
    {
        title: "Samosa",
        ingredients: ["flour", "potato", "peas", "cumin seeds", "coriander seeds", "green chili"],
        instructions: "• Make dough with flour, oil, and water, rest for 30 minutes\n• Boil and mash potatoes, mix with peas and spices\n• Roll dough into small circles and cut in half\n• Form cone shape and fill with potato mixture\n• Seal edges with water to make triangular pockets\n• Deep fry in hot oil until golden and crispy\n• Serve hot with mint or tamarind chutney",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
    },
    {
        title: "Tandoori Chicken",
        ingredients: ["chicken", "yogurt", "tandoori masala", "lemon", "garlic", "ginger"],
        instructions: "• Make deep cuts in chicken pieces for better marinade penetration\n• Mix yogurt with tandoori masala, lemon juice, ginger-garlic paste\n• Marinate chicken in spice mixture for at least 4 hours\n• Preheat oven to 450°F or prepare grill\n• Cook chicken for 25-30 minutes, turning once\n• Brush with butter and cook for 5 more minutes\n• Serve hot with sliced onions, lemon wedges, and mint chutney",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400"
    },
    {
        title: "Palak Paneer",
        ingredients: ["spinach", "paneer", "onion", "tomato", "garlic", "ginger", "cream"],
        instructions: "• Blanch spinach leaves in boiling water for 2 minutes\n• Immediately transfer to ice water to retain green color\n• Blend blanched spinach to smooth puree\n• Sauté onions until golden, add ginger-garlic paste\n• Add tomatoes and cook until soft and pulpy\n• Add spinach puree and simmer for 10 minutes\n• Add paneer cubes and cream, cook for 5 minutes\n• Season with salt and garam masala before serving",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        await Recipe.deleteMany({});
        console.log('Cleared existing recipes');
        
        await Recipe.insertMany(detailedRecipes);
        console.log(`${detailedRecipes.length} detailed recipes added successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();