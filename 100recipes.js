const mongoose = require('mongoose');
const Recipe = require('./Model/recipeModel');
require('dotenv').config();

const recipes = [
    // Indian Recipes (50)
    { title: "Butter Chicken", ingredients: ["chicken", "butter", "tomato", "cream", "garam masala"], instructions: "• Marinate chicken 2hrs\n• Cook in butter\n• Add tomato puree\n• Add cream & spices\n• Simmer 10min" },
    { title: "Chicken Biryani", ingredients: ["rice", "chicken", "saffron", "onion", "yogurt"], instructions: "• Soak rice 30min\n• Marinate chicken\n• Fry onions golden\n• Layer rice & chicken\n• Cook 45min covered" },
    { title: "Dal Tadka", ingredients: ["lentils", "turmeric", "cumin", "garlic", "tomato"], instructions: "• Boil lentils soft\n• Heat oil, add cumin\n• Add garlic & tomato\n• Mix with dal\n• Garnish coriander" },
    { title: "Paneer Tikka", ingredients: ["paneer", "yogurt", "spices", "peppers", "onion"], instructions: "• Cut paneer cubes\n• Marinate 30min\n• Thread on skewers\n• Grill until charred\n• Serve hot" },
    { title: "Chole Bhature", ingredients: ["chickpeas", "flour", "yogurt", "onion", "spices"], instructions: "• Cook chickpeas\n• Make dough\n• Fry bhature\n• Cook spiced chole\n• Serve together" },
    { title: "Masala Dosa", ingredients: ["rice", "urad dal", "potato", "spices"], instructions: "• Ferment batter\n• Make potato filling\n• Spread batter thin\n• Add filling & fold\n• Serve with chutney" },
    { title: "Rajma", ingredients: ["kidney beans", "onion", "tomato", "spices"], instructions: "• Soak beans overnight\n• Pressure cook\n• Sauté onions\n• Add tomatoes & spices\n• Simmer 20min" },
    { title: "Samosa", ingredients: ["flour", "potato", "peas", "spices"], instructions: "• Make dough\n• Prepare filling\n• Shape triangles\n• Deep fry golden\n• Serve with chutney" },
    { title: "Tandoori Chicken", ingredients: ["chicken", "yogurt", "tandoori masala", "lemon"], instructions: "• Marinate 4hrs\n• Preheat oven 450°F\n• Cook 25min\n• Brush with butter\n• Serve hot" },
    { title: "Palak Paneer", ingredients: ["spinach", "paneer", "onion", "cream"], instructions: "• Blanch spinach\n• Make puree\n• Sauté onions\n• Add spinach & paneer\n• Add cream" },
    { title: "Aloo Gobi", ingredients: ["potato", "cauliflower", "turmeric", "cumin"], instructions: "• Cut vegetables\n• Heat oil, add cumin\n• Add potatoes first\n• Add cauliflower\n• Cook covered" },
    { title: "Rogan Josh", ingredients: ["lamb", "yogurt", "kashmiri chili", "spices"], instructions: "• Marinate lamb\n• Brown meat\n• Add spices\n• Slow cook tender\n• Garnish herbs" },
    { title: "Idli Sambhar", ingredients: ["rice", "urad dal", "toor dal", "vegetables"], instructions: "• Ferment batter\n• Steam idlis\n• Cook dal curry\n• Add vegetables\n• Serve together" },
    { title: "Pav Bhaji", ingredients: ["vegetables", "pav bread", "butter", "spices"], instructions: "• Mash vegetables\n• Cook with spices\n• Butter the pav\n• Heat on griddle\n• Serve together" },
    { title: "Vada Pav", ingredients: ["potato", "gram flour", "bread", "chutney"], instructions: "• Make potato balls\n• Coat in batter\n• Deep fry\n• Serve in pav\n• Add chutney" },
    { title: "Dhokla", ingredients: ["gram flour", "yogurt", "eno", "spices"], instructions: "• Make batter\n• Add eno\n• Steam 15min\n• Temper with spices\n• Cut & serve" },
    { title: "Malai Kofta", ingredients: ["paneer", "potato", "cream", "tomato"], instructions: "• Make paneer balls\n• Fry golden\n• Make tomato gravy\n• Add cream\n• Add koftas" },
    { title: "Kadhi Pakora", ingredients: ["gram flour", "yogurt", "onion", "spices"], instructions: "• Make pakoras\n• Prepare kadhi\n• Add pakoras\n• Simmer 10min\n• Serve hot" },
    { title: "Fish Curry", ingredients: ["fish", "coconut", "curry leaves", "tamarind"], instructions: "• Marinate fish\n• Grind coconut\n• Make curry base\n• Add fish gently\n• Cook 10min" },
    { title: "Poha", ingredients: ["flattened rice", "onion", "potato", "spices"], instructions: "• Rinse poha\n• Temper spices\n• Add vegetables\n• Mix poha gently\n• Garnish lemon" },
    { title: "Upma", ingredients: ["semolina", "onion", "vegetables", "spices"], instructions: "• Roast semolina\n• Temper spices\n• Add vegetables\n• Add water & semolina\n• Cook covered" },
    { title: "Rasam", ingredients: ["tamarind", "tomato", "dal", "rasam powder"], instructions: "• Extract tamarind\n• Cook tomatoes\n• Add dal & spices\n• Simmer 15min\n• Garnish coriander" },
    { title: "Medu Vada", ingredients: ["urad dal", "ginger", "curry leaves"], instructions: "• Grind dal smooth\n• Add spices\n• Shape donuts\n• Deep fry crispy\n• Serve hot" },
    { title: "Baingan Bharta", ingredients: ["eggplant", "onion", "tomato", "spices"], instructions: "• Roast eggplant\n• Mash pulp\n• Sauté onions\n• Add tomatoes\n• Mix eggplant" },
    { title: "Keema", ingredients: ["minced meat", "onion", "tomato", "spices"], instructions: "• Brown meat\n• Add onions\n• Add tomatoes\n• Add spices\n• Cook tender" },
    { title: "Pulao", ingredients: ["rice", "vegetables", "whole spices", "ghee"], instructions: "• Soak rice\n• Heat ghee & spices\n• Add vegetables\n• Add rice & water\n• Cook covered" },
    { title: "Bhel Puri", ingredients: ["puffed rice", "sev", "chutney", "vegetables"], instructions: "• Mix puffed rice\n• Add vegetables\n• Add chutneys\n• Top with sev\n• Serve immediately" },
    { title: "Gulab Jamun", ingredients: ["milk powder", "flour", "sugar", "cardamom"], instructions: "• Make dough\n• Form balls\n• Fry golden\n• Make syrup\n• Soak 2hrs" },
    { title: "Rasgulla", ingredients: ["milk", "lemon", "sugar", "water"], instructions: "• Curdle milk\n• Make chenna balls\n• Boil sugar syrup\n• Cook balls 15min\n• Cool & serve" },
    { title: "Pani Puri", ingredients: ["puri", "potato", "chickpeas", "spiced water"], instructions: "• Prepare filling\n• Make spiced water\n• Fill puris\n• Serve immediately\n• Eat in one bite" },
    { title: "Dahi Vada", ingredients: ["urad dal", "yogurt", "chutney", "spices"], instructions: "• Make vadas\n• Soak in water\n• Whisk yogurt\n• Add vadas to yogurt\n• Top with chutney" },
    { title: "Kachori", ingredients: ["flour", "dal", "spices", "oil"], instructions: "• Make dough\n• Prepare dal filling\n• Stuff & seal\n• Deep fry crispy\n• Serve hot" },
    { title: "Paratha", ingredients: ["flour", "ghee", "salt", "water"], instructions: "• Make dough\n• Roll with ghee\n• Fold & roll again\n• Cook on griddle\n• Serve hot" },
    { title: "Kheer", ingredients: ["rice", "milk", "sugar", "cardamom", "nuts"], instructions: "• Cook rice in milk\n• Add sugar\n• Simmer thick\n• Add cardamom\n• Garnish nuts" },
    { title: "Halwa", ingredients: ["semolina", "ghee", "sugar", "milk", "nuts"], instructions: "• Roast semolina\n• Add hot milk\n• Add sugar\n• Cook thick\n• Garnish nuts" },
    { title: "Pakora", ingredients: ["vegetables", "gram flour", "spices", "oil"], instructions: "• Make batter\n• Dip vegetables\n• Deep fry golden\n• Drain oil\n• Serve hot" },
    { title: "Chana Masala", ingredients: ["chickpeas", "onion", "tomato", "spices"], instructions: "• Cook chickpeas\n• Sauté onions\n• Add tomatoes\n• Add spices\n• Simmer 15min" },
    { title: "Aloo Paratha", ingredients: ["flour", "potato", "spices", "ghee"], instructions: "• Make dough\n• Prepare potato filling\n• Stuff paratha\n• Cook with ghee\n• Serve hot" },
    { title: "Matar Paneer", ingredients: ["peas", "paneer", "onion", "tomato"], instructions: "• Sauté onions\n• Add tomatoes\n• Add peas & paneer\n• Add spices\n• Simmer 10min" },
    { title: "Chicken Curry", ingredients: ["chicken", "onion", "tomato", "coconut", "spices"], instructions: "• Marinate chicken\n• Sauté onions\n• Add tomatoes\n• Add chicken & coconut\n• Cook 20min" },
    { title: "Mutton Curry", ingredients: ["mutton", "onion", "yogurt", "spices"], instructions: "• Marinate mutton\n• Brown meat\n• Add onions\n• Add yogurt & spices\n• Slow cook 1hr" },
    { title: "Prawn Curry", ingredients: ["prawns", "coconut", "curry leaves", "spices"], instructions: "• Clean prawns\n• Grind coconut\n• Make curry base\n• Add prawns\n• Cook 8min" },
    { title: "Egg Curry", ingredients: ["eggs", "onion", "tomato", "spices"], instructions: "• Boil eggs\n• Sauté onions\n• Add tomatoes\n• Add eggs & spices\n• Simmer 10min" },
    { title: "Vegetable Curry", ingredients: ["mixed vegetables", "coconut", "spices"], instructions: "• Cut vegetables\n• Grind coconut\n• Cook vegetables\n• Add coconut paste\n• Simmer 15min" },
    { title: "Lemon Rice", ingredients: ["rice", "lemon", "peanuts", "curry leaves"], instructions: "• Cook rice\n• Temper spices\n• Add lemon juice\n• Mix with rice\n• Garnish peanuts" },
    { title: "Curd Rice", ingredients: ["rice", "yogurt", "cucumber", "spices"], instructions: "• Cook rice\n• Mix with yogurt\n• Add cucumber\n• Temper spices\n• Serve cool" },
    { title: "Coconut Rice", ingredients: ["rice", "coconut", "cashews", "spices"], instructions: "• Cook rice\n• Grate coconut\n• Temper spices\n• Mix coconut & rice\n• Garnish cashews" },
    { title: "Tamarind Rice", ingredients: ["rice", "tamarind", "peanuts", "spices"], instructions: "• Cook rice\n• Extract tamarind\n• Temper spices\n• Mix all together\n• Garnish peanuts" },
    { title: "Bisibele Bath", ingredients: ["rice", "dal", "vegetables", "spice powder"], instructions: "• Cook rice & dal\n• Add vegetables\n• Add spice powder\n• Mix well\n• Serve hot" },
    { title: "Mysore Pak", ingredients: ["gram flour", "ghee", "sugar", "water"], instructions: "• Roast gram flour\n• Make sugar syrup\n• Add flour to syrup\n• Add ghee gradually\n• Set & cut" },
    
    // International Recipes (50+)
    { title: "Spaghetti Carbonara", ingredients: ["spaghetti", "eggs", "parmesan", "pancetta"], instructions: "• Cook pasta\n• Fry pancetta\n• Beat eggs & cheese\n• Mix hot pasta\n• Serve immediately" },
    { title: "Beef Burger", ingredients: ["ground beef", "buns", "lettuce", "tomato"], instructions: "• Form patties\n• Grill 5min each side\n• Toast buns\n• Assemble burger\n• Serve hot" },
    { title: "Caesar Salad", ingredients: ["lettuce", "parmesan", "croutons", "dressing"], instructions: "• Chop lettuce\n• Make dressing\n• Toss together\n• Add croutons\n• Serve fresh" },
    { title: "Sushi Rolls", ingredients: ["rice", "nori", "fish", "avocado"], instructions: "• Season rice\n• Place on nori\n• Add fillings\n• Roll tightly\n• Cut pieces" },
    { title: "Tacos", ingredients: ["tortillas", "beef", "lettuce", "cheese"], instructions: "• Cook seasoned beef\n• Warm tortillas\n• Fill with toppings\n• Fold & serve\n• Add lime" },
    { title: "Pad Thai", ingredients: ["noodles", "shrimp", "eggs", "sauce"], instructions: "• Soak noodles\n• Stir fry shrimp\n• Add noodles & sauce\n• Scramble eggs\n• Garnish peanuts" },
    { title: "Pizza Margherita", ingredients: ["dough", "tomato", "mozzarella", "basil"], instructions: "• Roll dough\n• Add sauce\n• Top with cheese\n• Bake 12min\n• Add fresh basil" },
    { title: "Fried Rice", ingredients: ["rice", "eggs", "vegetables", "soy sauce"], instructions: "• Use cold rice\n• Scramble eggs\n• Stir fry vegetables\n• Add rice & sauce\n• Toss together" },
    { title: "Greek Salad", ingredients: ["tomato", "cucumber", "olives", "feta"], instructions: "• Chop vegetables\n• Add olives & feta\n• Drizzle olive oil\n• Season well\n• Serve fresh" },
    { title: "Ramen", ingredients: ["noodles", "broth", "egg", "pork"], instructions: "• Prepare rich broth\n• Cook noodles\n• Soft boil egg\n• Assemble bowl\n• Serve hot" },
    { title: "Fish & Chips", ingredients: ["fish", "potatoes", "flour", "beer"], instructions: "• Cut thick chips\n• Make beer batter\n• Fry chips first\n• Batter & fry fish\n• Serve together" },
    { title: "Paella", ingredients: ["rice", "saffron", "seafood", "chicken"], instructions: "• Heat paella pan\n• Cook proteins\n• Add rice & saffron\n• Add broth\n• Simmer 20min" },
    { title: "Lasagna", ingredients: ["pasta", "beef", "tomato sauce", "cheese"], instructions: "• Cook meat sauce\n• Layer pasta & sauce\n• Top with cheese\n• Bake 45min\n• Rest 10min" },
    { title: "Pho", ingredients: ["noodles", "broth", "beef", "herbs"], instructions: "• Simmer rich broth\n• Cook noodles\n• Slice beef thin\n• Assemble bowl\n• Add herbs" },
    { title: "Falafel", ingredients: ["chickpeas", "herbs", "spices", "tahini"], instructions: "• Grind chickpeas\n• Add herbs & spices\n• Form balls\n• Deep fry\n• Serve with tahini" },
    { title: "Stir Fry", ingredients: ["vegetables", "soy sauce", "garlic", "ginger"], instructions: "• Heat wok high\n• Add aromatics\n• Stir fry vegetables\n• Add sauce\n• Serve over rice" },
    { title: "Quesadilla", ingredients: ["tortillas", "cheese", "chicken", "peppers"], instructions: "• Fill tortilla\n• Fold in half\n• Cook until crispy\n• Flip carefully\n• Cut wedges" },
    { title: "Pancakes", ingredients: ["flour", "milk", "eggs", "sugar"], instructions: "• Mix batter\n• Heat griddle\n• Pour batter\n• Flip when bubbly\n• Serve with syrup" },
    { title: "French Toast", ingredients: ["bread", "eggs", "milk", "cinnamon"], instructions: "• Beat egg mixture\n• Dip bread\n• Cook golden brown\n• Flip once\n• Serve warm" },
    { title: "Chicken Wings", ingredients: ["wings", "hot sauce", "butter", "celery"], instructions: "• Bake wings 45min\n• Mix sauce & butter\n• Toss wings\n• Serve with celery\n• Add blue cheese" },
    { title: "Beef Stew", ingredients: ["beef", "potatoes", "carrots", "broth"], instructions: "• Brown beef chunks\n• Add vegetables\n• Pour broth\n• Simmer 2hrs\n• Season well" },
    { title: "Chicken Soup", ingredients: ["chicken", "noodles", "carrots", "celery"], instructions: "• Simmer chicken\n• Add vegetables\n• Shred chicken\n• Add noodles\n• Season & serve" },
    { title: "Grilled Salmon", ingredients: ["salmon", "lemon", "herbs", "olive oil"], instructions: "• Marinate salmon\n• Preheat grill\n• Cook 6min per side\n• Brush with oil\n• Serve with lemon" },
    { title: "Chocolate Cake", ingredients: ["flour", "cocoa", "sugar", "eggs"], instructions: "• Mix dry ingredients\n• Beat wet ingredients\n• Combine & bake\n• Cool completely\n• Frost layers" },
    { title: "Apple Pie", ingredients: ["apples", "flour", "butter", "sugar"], instructions: "• Make pie crust\n• Slice apples\n• Mix with sugar\n• Fill crust\n• Bake 45min" },
    { title: "Cheesecake", ingredients: ["cream cheese", "sugar", "eggs", "graham crackers"], instructions: "• Make crust\n• Beat filling\n• Pour over crust\n• Bake in water bath\n• Chill overnight" },
    { title: "Tiramisu", ingredients: ["ladyfingers", "coffee", "mascarpone", "cocoa"], instructions: "• Dip cookies in coffee\n• Layer with cream\n• Repeat layers\n• Chill 4hrs\n• Dust cocoa" },
    { title: "Brownies", ingredients: ["chocolate", "butter", "sugar", "eggs"], instructions: "• Melt chocolate & butter\n• Beat in sugar & eggs\n• Add flour\n• Bake 25min\n• Cool & cut" },
    { title: "Cookies", ingredients: ["flour", "butter", "sugar", "chocolate chips"], instructions: "• Cream butter & sugar\n• Add flour\n• Fold in chips\n• Bake 10min\n• Cool on rack" },
    { title: "Meatballs", ingredients: ["ground meat", "breadcrumbs", "egg", "herbs"], instructions: "• Mix ingredients\n• Form balls\n• Brown in pan\n• Simmer in sauce\n• Serve hot" },
    { title: "Chicken Parmesan", ingredients: ["chicken", "breadcrumbs", "parmesan", "tomato sauce"], instructions: "• Bread chicken\n• Fry golden\n• Top with sauce\n• Add cheese\n• Bake 20min" },
    { title: "Beef Tacos", ingredients: ["ground beef", "taco shells", "lettuce", "salsa"], instructions: "• Cook seasoned beef\n• Warm shells\n• Fill with meat\n• Add toppings\n• Serve immediately" },
    { title: "Chicken Fajitas", ingredients: ["chicken", "peppers", "onions", "tortillas"], instructions: "• Slice chicken thin\n• Sauté with vegetables\n• Season well\n• Serve with tortillas\n• Add toppings" },
    { title: "Beef Stroganoff", ingredients: ["beef", "mushrooms", "sour cream", "noodles"], instructions: "• Brown beef strips\n• Sauté mushrooms\n• Make cream sauce\n• Combine all\n• Serve over noodles" },
    { title: "Chicken Alfredo", ingredients: ["chicken", "pasta", "cream", "parmesan"], instructions: "• Cook chicken\n• Boil pasta\n• Make cream sauce\n• Combine all\n• Serve hot" },
    { title: "Shrimp Scampi", ingredients: ["shrimp", "garlic", "butter", "white wine"], instructions: "• Sauté garlic\n• Add shrimp\n• Add wine & butter\n• Toss with pasta\n• Garnish parsley" },
    { title: "Clam Chowder", ingredients: ["clams", "potatoes", "cream", "bacon"], instructions: "• Cook bacon\n• Sauté vegetables\n• Add clams & cream\n• Simmer thick\n• Season well" },
    { title: "Lobster Roll", ingredients: ["lobster", "mayo", "celery", "rolls"], instructions: "• Cook lobster\n• Mix with mayo\n• Add celery\n• Fill toasted rolls\n• Serve chilled" },
    { title: "Crab Cakes", ingredients: ["crab", "breadcrumbs", "egg", "mayo"], instructions: "• Mix crab gently\n• Form patties\n• Coat in crumbs\n• Pan fry golden\n• Serve with sauce" },
    { title: "Fish Tacos", ingredients: ["fish", "cabbage", "lime", "tortillas"], instructions: "• Season & grill fish\n• Shred cabbage\n• Warm tortillas\n• Assemble tacos\n• Add lime juice" },
    { title: "Chicken Teriyaki", ingredients: ["chicken", "soy sauce", "mirin", "sugar"], instructions: "• Marinate chicken\n• Grill until done\n• Make teriyaki sauce\n• Glaze chicken\n• Serve over rice" },
    { title: "Beef Burritos", ingredients: ["beef", "beans", "rice", "tortillas"], instructions: "• Cook seasoned beef\n• Warm beans & rice\n• Fill large tortillas\n• Roll tightly\n• Serve hot" },
    { title: "Chicken Quesadillas", ingredients: ["chicken", "cheese", "peppers", "tortillas"], instructions: "• Cook chicken & peppers\n• Fill tortillas with cheese\n• Cook until crispy\n• Cut into wedges\n• Serve with salsa" },
    { title: "Vegetable Soup", ingredients: ["mixed vegetables", "broth", "herbs", "pasta"], instructions: "• Sauté vegetables\n• Add broth\n• Simmer 20min\n• Add pasta\n• Season & serve" },
    { title: "Minestrone", ingredients: ["vegetables", "beans", "pasta", "tomatoes"], instructions: "• Sauté vegetables\n• Add tomatoes & broth\n• Add beans & pasta\n• Simmer 30min\n• Serve hot" },
    { title: "Chicken Noodle Soup", ingredients: ["chicken", "noodles", "carrots", "celery"], instructions: "• Simmer chicken\n• Add vegetables\n• Shred chicken\n• Add noodles\n• Season well" },
    { title: "Tomato Soup", ingredients: ["tomatoes", "cream", "basil", "onion"], instructions: "• Sauté onions\n• Add tomatoes\n• Simmer 20min\n• Blend smooth\n• Add cream & basil" },
    { title: "Mushroom Risotto", ingredients: ["rice", "mushrooms", "broth", "parmesan"], instructions: "• Sauté mushrooms\n• Toast rice\n• Add broth gradually\n• Stir constantly\n• Add cheese" },
    { title: "Chicken Fried Rice", ingredients: ["rice", "chicken", "eggs", "vegetables"], instructions: "• Use day-old rice\n• Scramble eggs\n• Stir fry chicken\n• Add rice & vegetables\n• Season with soy sauce" },
    { title: "Beef Fried Rice", ingredients: ["rice", "beef", "soy sauce", "vegetables"], instructions: "• Cook beef strips\n• Use cold rice\n• Stir fry together\n• Add soy sauce\n• Garnish green onions" },
    { title: "Vegetable Fried Rice", ingredients: ["rice", "mixed vegetables", "soy sauce", "garlic"], instructions: "• Heat oil in wok\n• Stir fry vegetables\n• Add cold rice\n• Season well\n• Serve hot" },
    { title: "Shrimp Fried Rice", ingredients: ["rice", "shrimp", "eggs", "peas"], instructions: "• Cook shrimp\n• Scramble eggs\n• Stir fry rice\n• Combine all\n• Add soy sauce" }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        await Recipe.deleteMany({});
        console.log('Cleared existing recipes');
        
        await Recipe.insertMany(recipes);
        console.log(`${recipes.length} recipes added successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();