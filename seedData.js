const mongoose = require('mongoose');
const Recipe = require('./Model/recipeModel');
require('dotenv').config();

const sampleRecipes = [
    // Indian Recipes
    { title: "Butter Chicken", ingredients: ["chicken", "butter", "tomato", "cream", "garam masala", "garlic", "ginger"], instructions: "Marinate chicken in yogurt and spices. Cook in butter with tomato sauce and cream.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
    { title: "Biryani", ingredients: ["basmati rice", "chicken", "saffron", "onion", "yogurt", "mint", "coriander"], instructions: "Layer marinated chicken with rice and cook with saffron and spices.", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
    { title: "Dal Tadka", ingredients: ["lentils", "turmeric", "cumin", "mustard seeds", "garlic", "ginger", "tomato"], instructions: "Cook lentils with turmeric. Temper with cumin, mustard seeds, and spices.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
    { title: "Paneer Tikka", ingredients: ["paneer", "yogurt", "red chili powder", "garam masala", "bell peppers", "onion"], instructions: "Marinate paneer in spiced yogurt. Grill with vegetables until charred.", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400" },
    { title: "Chole Bhature", ingredients: ["chickpeas", "flour", "yogurt", "baking powder", "onion", "tomato", "spices"], instructions: "Cook spiced chickpeas. Make fried bread with flour and yogurt.", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400" },
    { title: "Masala Dosa", ingredients: ["rice", "urad dal", "potato", "mustard seeds", "curry leaves", "turmeric"], instructions: "Make fermented batter. Cook thin crepes with spiced potato filling.", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { title: "Rajma", ingredients: ["kidney beans", "onion", "tomato", "ginger", "garlic", "cumin", "coriander"], instructions: "Cook kidney beans in spiced tomato gravy with aromatic spices.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400" },
    { title: "Samosa", ingredients: ["flour", "potato", "peas", "cumin seeds", "coriander seeds", "green chili"], instructions: "Make dough, prepare spiced potato filling, wrap and deep fry.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { title: "Tandoori Chicken", ingredients: ["chicken", "yogurt", "tandoori masala", "lemon", "garlic", "ginger"], instructions: "Marinate chicken in spiced yogurt overnight. Grill until charred.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400" },
    { title: "Palak Paneer", ingredients: ["spinach", "paneer", "onion", "tomato", "garlic", "ginger", "cream"], instructions: "Blanch spinach, make puree. Cook with paneer in spiced gravy.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
    { title: "Aloo Gobi", ingredients: ["potato", "cauliflower", "turmeric", "cumin", "coriander", "ginger"], instructions: "Stir fry potatoes and cauliflower with aromatic spices.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400" },
    { title: "Rogan Josh", ingredients: ["lamb", "yogurt", "kashmiri chili", "fennel", "ginger", "garlic"], instructions: "Slow cook lamb in aromatic Kashmiri spices and yogurt.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
    { title: "Idli Sambhar", ingredients: ["rice", "urad dal", "toor dal", "tamarind", "vegetables", "sambhar powder"], instructions: "Steam fermented rice cakes. Serve with lentil vegetable curry.", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { title: "Pav Bhaji", ingredients: ["mixed vegetables", "pav bread", "butter", "onion", "tomato", "pav bhaji masala"], instructions: "Mash cooked vegetables with spices. Serve with buttered bread.", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400" },
    { title: "Vada Pav", ingredients: ["potato", "gram flour", "bread", "green chili", "ginger", "mustard seeds"], instructions: "Make spiced potato balls, coat in gram flour batter, fry and serve in bread.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { title: "Dhokla", ingredients: ["gram flour", "yogurt", "ginger", "green chili", "eno", "mustard seeds"], instructions: "Steam gram flour batter with yogurt. Temper with mustard seeds.", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { title: "Malai Kofta", ingredients: ["paneer", "potato", "cashews", "cream", "tomato", "onion", "spices"], instructions: "Make paneer potato balls. Cook in rich creamy tomato gravy.", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400" },
    { title: "Kadhi Pakora", ingredients: ["gram flour", "yogurt", "onion", "ginger", "turmeric", "cumin"], instructions: "Make gram flour fritters. Cook in spiced yogurt curry.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400" },
    { title: "Hyderabadi Biryani", ingredients: ["mutton", "basmati rice", "saffron", "mint", "fried onions", "yogurt"], instructions: "Layer marinated mutton with rice. Cook in sealed pot with saffron.", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
    { title: "Fish Curry", ingredients: ["fish", "coconut", "curry leaves", "mustard seeds", "tamarind", "red chili"], instructions: "Cook fish in coconut curry with South Indian spices.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
    { title: "Poha", ingredients: ["flattened rice", "onion", "potato", "mustard seeds", "curry leaves", "turmeric"], instructions: "Soak flattened rice. Sauté with vegetables and spices.", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { title: "Upma", ingredients: ["semolina", "onion", "ginger", "mustard seeds", "curry leaves", "vegetables"], instructions: "Roast semolina. Cook with tempered spices and vegetables.", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { title: "Rasam", ingredients: ["tamarind", "tomato", "toor dal", "rasam powder", "curry leaves", "mustard seeds"], instructions: "Cook tamarind water with spices and lentils. Temper with mustard seeds.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
    { title: "Medu Vada", ingredients: ["urad dal", "ginger", "green chili", "curry leaves", "black pepper"], instructions: "Grind urad dal to smooth paste. Shape into donuts and deep fry.", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { title: "Baingan Bharta", ingredients: ["eggplant", "onion", "tomato", "garlic", "ginger", "green chili"], instructions: "Roast eggplant until charred. Mash and cook with spiced onion tomato base.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400" },
    { title: "Keema", ingredients: ["minced meat", "onion", "tomato", "ginger", "garlic", "garam masala"], instructions: "Cook minced meat with onions, tomatoes and aromatic spices.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
    { title: "Pulao", ingredients: ["basmati rice", "vegetables", "whole spices", "ghee", "onion"], instructions: "Cook rice with vegetables and whole spices in ghee.", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
    { title: "Bhel Puri", ingredients: ["puffed rice", "sev", "onion", "tomato", "chutneys", "coriander"], instructions: "Mix puffed rice with vegetables, chutneys and sev.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { title: "Gulab Jamun", ingredients: ["milk powder", "flour", "ghee", "sugar", "cardamom", "rose water"], instructions: "Make dough balls, deep fry and soak in sugar syrup.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },
    { title: "Rasgulla", ingredients: ["milk", "lemon juice", "sugar", "cardamom", "water"], instructions: "Make cottage cheese balls and cook in sugar syrup.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },
    
    // International Recipes
    { title: "Spaghetti Carbonara", ingredients: ["spaghetti", "eggs", "parmesan", "pancetta", "black pepper"], instructions: "Cook pasta. Mix with eggs, cheese, and crispy pancetta.", image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400" },
    { title: "Beef Burger", ingredients: ["ground beef", "burger buns", "lettuce", "tomato", "cheese", "onion"], instructions: "Form beef patties, grill and assemble with toppings.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
    { title: "Caesar Salad", ingredients: ["romaine lettuce", "parmesan", "croutons", "caesar dressing", "anchovies"], instructions: "Toss lettuce with dressing, top with cheese and croutons.", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400" },
    { title: "Sushi Rolls", ingredients: ["sushi rice", "nori", "fish", "avocado", "cucumber", "wasabi"], instructions: "Roll seasoned rice with fish and vegetables in seaweed.", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400" },
    { title: "Tacos", ingredients: ["tortillas", "ground beef", "lettuce", "cheese", "salsa", "sour cream"], instructions: "Fill tortillas with seasoned meat and fresh toppings.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400" },
    { title: "Pad Thai", ingredients: ["rice noodles", "shrimp", "eggs", "bean sprouts", "tamarind", "fish sauce"], instructions: "Stir fry noodles with protein, vegetables and tangy sauce.", image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400" },
    { title: "Margherita Pizza", ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil", "olive oil"], instructions: "Top dough with sauce, cheese and basil. Bake until crispy.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400" },
    { title: "Fried Rice", ingredients: ["rice", "eggs", "vegetables", "soy sauce", "garlic", "ginger"], instructions: "Stir fry cold rice with eggs, vegetables and seasonings.", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400" },
    { title: "Greek Salad", ingredients: ["tomatoes", "cucumber", "olives", "feta cheese", "olive oil", "oregano"], instructions: "Combine vegetables, cheese and olives with olive oil dressing.", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
    { title: "Ramen", ingredients: ["ramen noodles", "broth", "eggs", "pork", "green onions", "nori"], instructions: "Cook noodles in rich broth, top with egg and meat.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400" },
    { title: "Fish and Chips", ingredients: ["fish fillets", "potatoes", "flour", "beer", "oil", "malt vinegar"], instructions: "Batter and fry fish, serve with thick cut fried potatoes.", image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400" },
    { title: "Paella", ingredients: ["rice", "saffron", "seafood", "chicken", "bell peppers", "peas"], instructions: "Cook rice with saffron, add seafood and vegetables.", image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400" },
    { title: "Lasagna", ingredients: ["pasta sheets", "ground beef", "tomato sauce", "ricotta", "mozzarella"], instructions: "Layer pasta with meat sauce and cheese, bake until bubbly.", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400" },
    { title: "Pho", ingredients: ["rice noodles", "beef broth", "beef", "herbs", "lime", "bean sprouts"], instructions: "Serve noodles and meat in aromatic Vietnamese broth.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400" },
    { title: "Falafel", ingredients: ["chickpeas", "parsley", "garlic", "cumin", "coriander", "tahini"], instructions: "Grind chickpeas with herbs and spices, form balls and fry.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { title: "Stir Fry", ingredients: ["vegetables", "soy sauce", "garlic", "ginger", "sesame oil", "rice"], instructions: "Quick fry vegetables with Asian seasonings over high heat.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
    { title: "Quesadilla", ingredients: ["tortillas", "cheese", "chicken", "peppers", "onions", "salsa"], instructions: "Fill tortillas with cheese and fillings, cook until crispy.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400" },
    { title: "Pancakes", ingredients: ["flour", "milk", "eggs", "sugar", "baking powder", "butter"], instructions: "Mix batter, cook on griddle until fluffy and golden.", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" },
    { title: "French Toast", ingredients: ["bread", "eggs", "milk", "cinnamon", "vanilla", "maple syrup"], instructions: "Dip bread in egg mixture, cook until golden brown.", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" },
    { title: "Chicken Wings", ingredients: ["chicken wings", "hot sauce", "butter", "garlic", "celery", "blue cheese"], instructions: "Fry wings until crispy, toss in spicy butter sauce.", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400" },
    { title: "Beef Stew", ingredients: ["beef", "potatoes", "carrots", "onions", "beef broth", "herbs"], instructions: "Slow cook beef with vegetables in rich broth.", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400" },
    { title: "Chicken Soup", ingredients: ["chicken", "noodles", "carrots", "celery", "onion", "herbs"], instructions: "Simmer chicken with vegetables, add noodles before serving.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400" },
    { title: "Grilled Salmon", ingredients: ["salmon", "lemon", "garlic", "herbs", "olive oil", "asparagus"], instructions: "Marinate salmon, grill with vegetables until flaky.", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400" },
    { title: "Chocolate Cake", ingredients: ["flour", "cocoa", "sugar", "eggs", "butter", "chocolate"], instructions: "Mix ingredients, bake layers and frost with chocolate.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { title: "Apple Pie", ingredients: ["apples", "flour", "butter", "sugar", "cinnamon", "pie crust"], instructions: "Fill pastry with spiced apples, bake until golden.", image: "https://images.unsplash.com/photo-1535920527002-b35e96722da9?w=400" },
    { title: "Cheesecake", ingredients: ["cream cheese", "sugar", "eggs", "graham crackers", "butter", "vanilla"], instructions: "Make crust, blend filling, bake in water bath.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400" },
    { title: "Tiramisu", ingredients: ["ladyfingers", "coffee", "mascarpone", "eggs", "sugar", "cocoa"], instructions: "Layer coffee-soaked cookies with creamy mascarpone mixture.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },
    { title: "Brownies", ingredients: ["chocolate", "butter", "sugar", "eggs", "flour", "cocoa"], instructions: "Melt chocolate with butter, mix with other ingredients and bake.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { title: "Cookies", ingredients: ["flour", "butter", "sugar", "eggs", "vanilla", "chocolate chips"], instructions: "Cream butter and sugar, add dry ingredients and chips.", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400" },
    { title: "Ice Cream", ingredients: ["cream", "milk", "sugar", "eggs", "vanilla", "salt"], instructions: "Heat milk, temper eggs, churn in ice cream maker.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400" },
    { title: "Smoothie", ingredients: ["fruits", "yogurt", "milk", "honey", "ice", "spinach"], instructions: "Blend all ingredients until smooth and creamy.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400" }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Clear existing recipes
        await Recipe.deleteMany({});
        console.log('Cleared existing recipes');
        
        // Insert sample recipes
        await Recipe.insertMany(sampleRecipes);
        console.log(`${sampleRecipes.length} recipes added successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();