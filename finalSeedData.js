const mongoose = require('mongoose');
const Recipe = require('./Model/recipeModel');
require('dotenv').config();

const recipes = [
    {
        title: "Butter Chicken",
        ingredients: ["chicken", "butter", "tomato", "cream", "garam masala", "garlic", "ginger"],
        instructions: "• Marinate chicken pieces in yogurt, lemon juice, and spices for 2 hours\n• Heat butter in pan and cook marinated chicken until golden\n• Add minced garlic and ginger, sauté for 1 minute\n• Add tomato puree and cook for 5 minutes until thick\n• Add cream, garam masala, and cooked chicken\n• Simmer for 10 minutes until sauce coats chicken\n• Garnish with fresh coriander and serve with rice"
    },
    {
        title: "Chicken Biryani",
        ingredients: ["basmati rice", "chicken", "saffron", "onion", "yogurt", "mint", "coriander"],
        instructions: "• Soak basmati rice for 30 minutes, boil until 70% cooked\n• Marinate chicken in yogurt and spices for 1 hour\n• Deep fry sliced onions until golden brown\n• Cook marinated chicken until tender\n• Layer rice over chicken, sprinkle fried onions\n• Add saffron milk and cover tightly\n• Cook on high heat 3 minutes, then low heat 45 minutes"
    },
    {
        title: "Dal Tadka",
        ingredients: ["lentils", "turmeric", "cumin", "mustard seeds", "garlic", "ginger", "tomato"],
        instructions: "• Boil lentils with turmeric and salt until soft\n• Heat ghee, add cumin and mustard seeds\n• Add garlic, ginger, and green chilies\n• Add tomatoes and cook until soft\n• Pour tempering over cooked dal\n• Adjust consistency with water\n• Garnish with coriander and serve hot"
    },
    {
        title: "Paneer Tikka",
        ingredients: ["paneer", "yogurt", "red chili powder", "garam masala", "bell peppers", "onion"],
        instructions: "• Cut paneer and vegetables into cubes\n• Make marinade with yogurt and spices\n• Marinate for 30 minutes\n• Thread onto skewers alternately\n• Grill until edges are charred\n• Brush with butter while grilling\n• Serve hot with mint chutney"
    },
    {
        title: "Chole Bhature",
        ingredients: ["chickpeas", "flour", "yogurt", "baking powder", "onion", "tomato", "spices"],
        instructions: "• Soak chickpeas overnight, pressure cook until soft\n• Make bhature dough with flour, yogurt, baking powder\n• Sauté onions, add ginger-garlic paste\n• Add tomatoes and chole masala\n• Add cooked chickpeas and simmer\n• Roll and deep fry bhature until puffed\n• Serve hot chole with fresh bhature"
    },
    {
        title: "Masala Dosa",
        ingredients: ["rice", "urad dal", "potato", "mustard seeds", "curry leaves", "turmeric"],
        instructions: "• Soak rice and urad dal for 4-6 hours\n• Grind to smooth batter and ferment overnight\n• Make potato filling with spices\n• Heat dosa pan and spread batter thin\n• Drizzle oil and cook until golden\n• Add potato filling and fold\n• Serve with chutney and sambar"
    },
    {
        title: "Rajma",
        ingredients: ["kidney beans", "onion", "tomato", "ginger", "garlic", "cumin", "coriander"],
        instructions: "• Soak kidney beans overnight, pressure cook\n• Heat oil, add cumin seeds\n• Cook onions until golden\n• Add ginger-garlic paste\n• Add tomatoes and cook until soft\n• Add cooked rajma with liquid\n• Simmer for 20 minutes until thick"
    },
    {
        title: "Samosa",
        ingredients: ["flour", "potato", "peas", "cumin seeds", "coriander seeds", "green chili"],
        instructions: "• Make dough with flour, oil, and water\n• Boil and mash potatoes with peas and spices\n• Roll dough into circles and cut in half\n• Form cone shape and fill with mixture\n• Seal edges to make triangular pockets\n• Deep fry until golden and crispy\n• Serve with chutney"
    },
    {
        title: "Tandoori Chicken",
        ingredients: ["chicken", "yogurt", "tandoori masala", "lemon", "garlic", "ginger"],
        instructions: "• Make deep cuts in chicken pieces\n• Mix yogurt with spices and lemon juice\n• Marinate chicken for 4 hours\n• Preheat oven to 450°F\n• Cook for 25-30 minutes, turning once\n• Brush with butter and cook 5 more minutes\n• Serve with onions and mint chutney"
    },
    {
        title: "Palak Paneer",
        ingredients: ["spinach", "paneer", "onion", "tomato", "garlic", "ginger", "cream"],
        instructions: "• Blanch spinach in boiling water for 2 minutes\n• Transfer to ice water and blend to puree\n• Sauté onions until golden\n• Add ginger-garlic paste and tomatoes\n• Add spinach puree and simmer\n• Add paneer cubes and cream\n• Season and cook for 5 minutes"
    },
    {
        title: "Aloo Gobi",
        ingredients: ["potato", "cauliflower", "turmeric", "cumin", "coriander", "ginger"],
        instructions: "• Cut potatoes and cauliflower into pieces\n• Heat oil, add cumin seeds\n• Add potatoes and cook until half done\n• Add cauliflower and spices\n• Cover and cook on low heat\n• Stir occasionally until vegetables are tender\n• Garnish with coriander"
    },
    {
        title: "Rogan Josh",
        ingredients: ["lamb", "yogurt", "kashmiri chili", "fennel", "ginger", "garlic"],
        instructions: "• Cut lamb into pieces and marinate in yogurt\n• Heat oil and brown the meat\n• Add whole spices and cook\n• Add ginger-garlic paste\n• Add Kashmiri chili powder for color\n• Add water and slow cook until tender\n• Garnish with fresh herbs"
    },
    {
        title: "Idli Sambhar",
        ingredients: ["rice", "urad dal", "toor dal", "tamarind", "vegetables", "sambhar powder"],
        instructions: "• Soak rice and urad dal separately\n• Grind to smooth batter and ferment\n• Steam in idli molds for 10-12 minutes\n• Cook toor dal with turmeric\n• Add vegetables and sambhar powder\n• Add tamarind water and simmer\n• Serve idlis with hot sambhar"
    },
    {
        title: "Pav Bhaji",
        ingredients: ["mixed vegetables", "pav bread", "butter", "onion", "tomato", "pav bhaji masala"],
        instructions: "• Boil and mash mixed vegetables\n• Heat butter, sauté onions until golden\n• Add tomatoes and cook until soft\n• Add pav bhaji masala and mashed vegetables\n• Cook until thick consistency\n• Heat pav with butter on griddle\n• Serve bhaji with buttered pav"
    },
    {
        title: "Vada Pav",
        ingredients: ["potato", "gram flour", "bread", "green chili", "ginger", "mustard seeds"],
        instructions: "• Boil and mash potatoes with spices\n• Make gram flour batter with water\n• Form potato balls and dip in batter\n• Deep fry until golden brown\n• Slit pav bread and apply chutneys\n• Place vada inside pav\n• Serve hot with fried green chilies"
    },
    {
        title: "Dhokla",
        ingredients: ["gram flour", "yogurt", "ginger", "green chili", "eno", "mustard seeds"],
        instructions: "• Mix gram flour with yogurt and water\n• Add ginger-chili paste and salt\n• Add eno just before steaming\n• Steam for 15-20 minutes until done\n• Heat oil, add mustard seeds and curry leaves\n• Pour tempering over steamed dhokla\n• Cut into pieces and serve"
    },
    {
        title: "Malai Kofta",
        ingredients: ["paneer", "potato", "cashews", "cream", "tomato", "onion", "spices"],
        instructions: "• Mash paneer and potatoes together\n• Add spices and form into balls\n• Deep fry koftas until golden\n• Make gravy with onions and tomatoes\n• Add cream and cashew paste\n• Add fried koftas to gravy\n• Simmer for 5 minutes before serving"
    },
    {
        title: "Kadhi Pakora",
        ingredients: ["gram flour", "yogurt", "onion", "ginger", "turmeric", "cumin"],
        instructions: "• Make pakoras with gram flour batter and onions\n• Deep fry until crispy\n• Whisk yogurt with gram flour and water\n• Add turmeric and bring to boil\n• Add tempering of cumin and spices\n• Add fried pakoras to kadhi\n• Simmer for 10 minutes"
    },
    {
        title: "Fish Curry",
        ingredients: ["fish", "coconut", "curry leaves", "mustard seeds", "tamarind", "red chili"],
        instructions: "• Cut fish into pieces and marinate with turmeric\n• Grind coconut with red chilies\n• Heat oil, add mustard seeds and curry leaves\n• Add coconut paste and cook\n• Add tamarind water and bring to boil\n• Add fish pieces gently\n• Cook until fish is done"
    },
    {
        title: "Poha",
        ingredients: ["flattened rice", "onion", "potato", "mustard seeds", "curry leaves", "turmeric"],
        instructions: "• Rinse flattened rice and drain\n• Heat oil, add mustard seeds\n• Add curry leaves and onions\n• Add diced potatoes and cook\n• Add turmeric and salt\n• Add flattened rice and mix gently\n• Garnish with coriander and lemon"
    },
    {
        title: "Upma",
        ingredients: ["semolina", "onion", "ginger", "mustard seeds", "curry leaves", "vegetables"],
        instructions: "• Dry roast semolina until aromatic\n• Heat oil, add mustard seeds\n• Add curry leaves, ginger, and onions\n• Add vegetables and sauté\n• Add water and bring to boil\n• Slowly add roasted semolina while stirring\n• Cook until water is absorbed"
    },
    {
        title: "Rasam",
        ingredients: ["tamarind", "tomato", "toor dal", "rasam powder", "curry leaves", "mustard seeds"],
        instructions: "• Soak tamarind and extract juice\n• Cook toor dal until soft\n• Heat oil, add mustard seeds and curry leaves\n• Add tomatoes and cook until soft\n• Add tamarind juice and rasam powder\n• Add cooked dal and simmer\n• Garnish with coriander"
    },
    {
        title: "Medu Vada",
        ingredients: ["urad dal", "ginger", "green chili", "curry leaves", "black pepper"],
        instructions: "• Soak urad dal for 4 hours\n• Grind to smooth fluffy paste\n• Add chopped ginger, chilies, and curry leaves\n• Heat oil for deep frying\n• Wet hands and shape batter into donuts\n• Fry until golden brown and crispy\n• Serve hot with chutney and sambhar"
    },
    {
        title: "Baingan Bharta",
        ingredients: ["eggplant", "onion", "tomato", "garlic", "ginger", "green chili"],
        instructions: "• Roast whole eggplant until skin is charred\n• Peel and mash the pulp\n• Heat oil, add cumin seeds\n• Add onions and cook until golden\n• Add ginger-garlic paste\n• Add tomatoes and cook until soft\n• Add mashed eggplant and spices\n• Cook until moisture evaporates"
    },
    {
        title: "Keema",
        ingredients: ["minced meat", "onion", "tomato", "ginger", "garlic", "garam masala"],
        instructions: "• Heat oil and add whole spices\n• Add onions and cook until brown\n• Add ginger-garlic paste\n• Add minced meat and cook until browned\n• Add tomatoes and cook until soft\n• Add spices and water if needed\n• Cook until meat is tender"
    },
    {
        title: "Vegetable Pulao",
        ingredients: ["basmati rice", "vegetables", "whole spices", "ghee", "onion"],
        instructions: "• Soak basmati rice for 30 minutes\n• Heat ghee, add whole spices\n• Add onions and cook until golden\n• Add mixed vegetables and sauté\n• Add rice and gently mix\n• Add hot water and salt\n• Cook covered until rice is done"
    },
    {
        title: "Bhel Puri",
        ingredients: ["puffed rice", "sev", "onion", "tomato", "chutneys", "coriander"],
        instructions: "• Mix puffed rice with chopped onions and tomatoes\n• Add mint and tamarind chutneys\n• Add chopped coriander leaves\n• Mix everything gently\n• Top with sev and more chutney\n• Serve immediately while crispy\n• Garnish with extra coriander"
    },
    {
        title: "Gulab Jamun",
        ingredients: ["milk powder", "flour", "ghee", "sugar", "cardamom", "rose water"],
        instructions: "• Mix milk powder, flour, and a little ghee\n• Add milk gradually to make soft dough\n• Make small balls without cracks\n• Heat ghee and fry balls on low heat\n• Make sugar syrup with cardamom\n• Add fried balls to warm syrup\n• Let them soak for 2 hours"
    },
    {
        title: "Rasgulla",
        ingredients: ["milk", "lemon juice", "sugar", "cardamom", "water"],
        instructions: "• Boil milk and add lemon juice to curdle\n• Strain through cloth to get chenna\n• Knead chenna until smooth\n• Make small balls from chenna\n• Boil sugar syrup with cardamom\n• Add chenna balls to boiling syrup\n• Cook for 15 minutes until spongy"
    },
    {
        title: "Spaghetti Carbonara",
        ingredients: ["spaghetti", "eggs", "parmesan", "pancetta", "black pepper"],
        instructions: "• Cook spaghetti in salted water until al dente\n• Fry pancetta until crispy\n• Beat eggs with grated parmesan\n• Drain pasta, reserve some pasta water\n• Mix hot pasta with egg mixture quickly\n• Add pancetta and black pepper\n• Serve immediately with extra cheese"
    },
    {
        title: "Beef Burger",
        ingredients: ["ground beef", "burger buns", "lettuce", "tomato", "cheese", "onion"],
        instructions: "• Form ground beef into patties\n• Season with salt and pepper\n• Heat grill or pan to medium-high\n• Cook patties 4-5 minutes per side\n• Toast burger buns lightly\n• Assemble with lettuce, tomato, cheese\n• Serve with fries or chips"
    },
    {
        title: "Caesar Salad",
        ingredients: ["romaine lettuce", "parmesan", "croutons", "caesar dressing", "anchovies"],
        instructions: "• Wash and chop romaine lettuce\n• Make dressing with anchovies, garlic, lemon\n• Add parmesan and olive oil to dressing\n• Toss lettuce with dressing\n• Top with croutons and extra parmesan\n• Add freshly ground black pepper\n• Serve immediately"
    },
    {
        title: "Sushi Rolls",
        ingredients: ["sushi rice", "nori", "fish", "avocado", "cucumber", "wasabi"],
        instructions: "• Cook sushi rice and season with vinegar\n• Place nori on bamboo mat\n• Spread rice evenly on nori\n• Add fish, avocado, and cucumber\n• Roll tightly using bamboo mat\n• Cut into pieces with sharp knife\n• Serve with wasabi and soy sauce"
    },
    {
        title: "Tacos",
        ingredients: ["tortillas", "ground beef", "lettuce", "cheese", "salsa", "sour cream"],
        instructions: "• Cook ground beef with taco seasoning\n• Warm tortillas in dry pan\n• Shred lettuce and grate cheese\n• Fill tortillas with seasoned beef\n• Top with lettuce, cheese, and salsa\n• Add sour cream and hot sauce\n• Serve with lime wedges"
    },
    {
        title: "Pad Thai",
        ingredients: ["rice noodles", "shrimp", "eggs", "bean sprouts", "tamarind", "fish sauce"],
        instructions: "• Soak rice noodles in warm water\n• Heat oil in wok over high heat\n• Cook shrimp until pink\n• Push to one side, scramble eggs\n• Add drained noodles and sauce\n• Add bean sprouts and toss\n• Garnish with peanuts and lime"
    },
    {
        title: "Margherita Pizza",
        ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil", "olive oil"],
        instructions: "• Preheat oven to 475°F\n• Roll out pizza dough\n• Spread tomato sauce evenly\n• Add torn mozzarella pieces\n• Drizzle with olive oil\n• Bake for 12-15 minutes\n• Top with fresh basil leaves"
    },
    {
        title: "Fried Rice",
        ingredients: ["rice", "eggs", "vegetables", "soy sauce", "garlic", "ginger"],
        instructions: "• Use day-old cold rice\n• Heat oil in wok over high heat\n• Scramble eggs and set aside\n• Stir fry garlic, ginger, and vegetables\n• Add rice and break up clumps\n• Add soy sauce and scrambled eggs\n• Toss everything together quickly"
    },
    {
        title: "Greek Salad",
        ingredients: ["tomatoes", "cucumber", "olives", "feta cheese", "olive oil", "oregano"],
        instructions: "• Cut tomatoes and cucumber into chunks\n• Add kalamata olives\n• Crumble feta cheese on top\n• Drizzle with olive oil\n• Sprinkle with oregano and salt\n• Add red wine vinegar\n• Toss gently and serve"
    },
    {
        title: "Ramen",
        ingredients: ["ramen noodles", "broth", "eggs", "pork", "green onions", "nori"],
        instructions: "• Prepare rich broth by simmering bones\n• Cook ramen noodles separately\n• Soft boil eggs and slice in half\n• Cook pork belly until tender\n• Place noodles in bowl\n• Pour hot broth over noodles\n• Top with egg, pork, and green onions"
    },
    {
        title: "Fish and Chips",
        ingredients: ["fish fillets", "potatoes", "flour", "beer", "oil", "malt vinegar"],
        instructions: "• Cut potatoes into thick chips\n• Make batter with flour and beer\n• Heat oil to 350°F\n• Fry chips until golden\n• Dip fish in batter and fry\n• Drain on paper towels\n• Serve with malt vinegar and mushy peas"
    },
    {
        title: "Paella",
        ingredients: ["rice", "saffron", "seafood", "chicken", "bell peppers", "peas"],
        instructions: "• Heat oil in paella pan\n• Cook chicken until golden\n• Add rice and stir to coat\n• Add saffron-infused broth\n• Add seafood and vegetables\n• Simmer without stirring\n• Let rest for 5 minutes before serving"
    },
    {
        title: "Lasagna",
        ingredients: ["pasta sheets", "ground beef", "tomato sauce", "ricotta", "mozzarella"],
        instructions: "• Cook ground beef with onions\n• Add tomato sauce and simmer\n• Cook pasta sheets until al dente\n• Layer pasta, meat sauce, and cheeses\n• Repeat layers ending with cheese\n• Bake at 375°F for 45 minutes\n• Let rest 10 minutes before cutting"
    },
    {
        title: "Pho",
        ingredients: ["rice noodles", "beef broth", "beef", "herbs", "lime", "bean sprouts"],
        instructions: "• Simmer beef bones for rich broth\n• Add spices like star anise and cinnamon\n• Cook rice noodles separately\n• Slice raw beef very thin\n• Place noodles and raw beef in bowl\n• Pour boiling broth over to cook beef\n• Serve with herbs, lime, and bean sprouts"
    },
    {
        title: "Falafel",
        ingredients: ["chickpeas", "parsley", "garlic", "cumin", "coriander", "tahini"],
        instructions: "• Soak dried chickpeas overnight\n• Grind with herbs and spices\n• Form mixture into small balls\n• Deep fry until golden brown\n• Make tahini sauce with lemon\n• Serve in pita with vegetables\n• Drizzle with tahini sauce"
    },
    {
        title: "Stir Fry",
        ingredients: ["vegetables", "soy sauce", "garlic", "ginger", "sesame oil", "rice"],
        instructions: "• Cut vegetables into uniform pieces\n• Heat oil in wok over high heat\n• Add garlic and ginger first\n• Add harder vegetables first\n• Stir constantly to prevent burning\n• Add sauce and softer vegetables\n• Serve immediately over rice"
    },
    {
        title: "Quesadilla",
        ingredients: ["tortillas", "cheese", "chicken", "peppers", "onions", "salsa"],
        instructions: "• Cook chicken and vegetables\n• Place filling on half of tortilla\n• Top with cheese and fold over\n• Cook in dry pan until crispy\n• Flip carefully and cook other side\n• Cut into wedges\n• Serve with salsa and sour cream"
    },
    {
        title: "Pancakes",
        ingredients: ["flour", "milk", "eggs", "sugar", "baking powder", "butter"],
        instructions: "• Mix dry ingredients in bowl\n• Whisk wet ingredients separately\n• Combine wet and dry ingredients\n• Don't overmix the batter\n• Heat griddle and add butter\n• Pour batter and cook until bubbles form\n• Flip and cook until golden"
    },
    {
        title: "French Toast",
        ingredients: ["bread", "eggs", "milk", "cinnamon", "vanilla", "maple syrup"],
        instructions: "• Beat eggs with milk and spices\n• Dip bread slices in egg mixture\n• Let bread absorb mixture\n• Heat butter in pan\n• Cook bread until golden brown\n• Flip and cook other side\n• Serve with maple syrup"
    },
    {
        title: "Chicken Wings",
        ingredients: ["chicken wings", "hot sauce", "butter", "garlic", "celery", "blue cheese"],
        instructions: "• Pat wings dry and season\n• Bake at 425°F for 45 minutes\n• Mix hot sauce with melted butter\n• Toss cooked wings in sauce\n• Serve with celery sticks\n• Provide blue cheese dressing\n• Garnish with chopped parsley"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        await Recipe.deleteMany({});
        console.log('Cleared existing recipes');
        
        await Recipe.insertMany(recipes);
        console.log(`${recipes.length} recipes with detailed steps added successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();