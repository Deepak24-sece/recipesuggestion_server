const mongoose = require('mongoose');
const Recipe = require('./Model/recipeModel');
require('dotenv').config();

const snackRecipes = [
    // Indian Snacks
    { title: "Samosa", ingredients: ["flour", "potato", "peas", "spices", "oil"], instructions: "• Make dough with flour and oil\n• Prepare spiced potato filling\n• Shape into triangles\n• Deep fry until golden\n• Serve hot with chutney", cookingTime: 45, servings: 4 },
    { title: "Pakora", ingredients: ["gram flour", "onion", "potato", "spices", "oil"], instructions: "• Make batter with gram flour\n• Slice vegetables thin\n• Dip in batter and fry\n• Fry until crispy\n• Serve with mint chutney", cookingTime: 20, servings: 4 },
    { title: "Bhel Puri", ingredients: ["puffed rice", "sev", "onion", "chutney", "coriander"], instructions: "• Mix puffed rice with vegetables\n• Add mint and tamarind chutney\n• Top with sev\n• Mix gently\n• Serve immediately", cookingTime: 10, servings: 2 },
    { title: "Aloo Tikki", ingredients: ["potato", "spices", "breadcrumbs", "oil"], instructions: "• Boil and mash potatoes\n• Add spices and mix\n• Shape into patties\n• Coat with breadcrumbs\n• Shallow fry until golden", cookingTime: 30, servings: 4 },
    { title: "Dhokla", ingredients: ["gram flour", "yogurt", "ginger", "green chili", "eno"], instructions: "• Make batter with gram flour\n• Add yogurt and spices\n• Add eno and steam\n• Steam for 15 minutes\n• Temper and serve", cookingTime: 25, servings: 4 },
    { title: "Kachori", ingredients: ["flour", "dal", "spices", "oil"], instructions: "• Make dough with flour\n• Prepare spiced dal filling\n• Stuff and seal\n• Deep fry until puffed\n• Serve hot", cookingTime: 40, servings: 6 },
    { title: "Chaat", ingredients: ["potato", "chickpeas", "yogurt", "chutney", "sev"], instructions: "• Boil potatoes and chickpeas\n• Add yogurt and chutneys\n• Top with sev\n• Garnish with coriander\n• Serve immediately", cookingTime: 15, servings: 2 },
    { title: "Pani Puri", ingredients: ["puri", "potato", "chickpeas", "spiced water"], instructions: "• Prepare spiced water\n• Make potato chickpea filling\n• Fill puris with mixture\n• Add spiced water\n• Eat in one bite", cookingTime: 20, servings: 4 },
    { title: "Vada Pav", ingredients: ["potato", "gram flour", "bread", "chutney"], instructions: "• Make spiced potato balls\n• Coat in gram flour batter\n• Deep fry until golden\n• Serve in pav with chutney\n• Add fried chilies", cookingTime: 30, servings: 4 },
    { title: "Dahi Vada", ingredients: ["urad dal", "yogurt", "chutney", "spices"], instructions: "• Grind dal to smooth paste\n• Fry into vadas\n• Soak in water\n• Top with yogurt and chutney\n• Garnish with spices", cookingTime: 35, servings: 4 },
    
    // International Snacks
    { title: "French Fries", ingredients: ["potatoes", "oil", "salt"], instructions: "• Cut potatoes into strips\n• Soak in cold water\n• Pat dry completely\n• Deep fry until golden\n• Season with salt", cookingTime: 20, servings: 4 },
    { title: "Nachos", ingredients: ["tortilla chips", "cheese", "jalapeños", "salsa"], instructions: "• Spread chips on baking tray\n• Top with cheese\n• Add jalapeños\n• Bake until cheese melts\n• Serve with salsa", cookingTime: 10, servings: 4 },
    { title: "Popcorn", ingredients: ["corn kernels", "oil", "salt", "butter"], instructions: "• Heat oil in heavy pan\n• Add corn kernels\n• Cover and shake pan\n• Pop until sounds stop\n• Season with salt and butter", cookingTime: 8, servings: 2 },
    { title: "Chips and Dip", ingredients: ["potato chips", "sour cream", "onion soup mix"], instructions: "• Mix sour cream with soup mix\n• Let flavors blend\n• Chill for 30 minutes\n• Serve with chips\n• Garnish with herbs", cookingTime: 5, servings: 4 },
    { title: "Mozzarella Sticks", ingredients: ["mozzarella", "flour", "eggs", "breadcrumbs", "oil"], instructions: "• Cut mozzarella into sticks\n• Coat in flour, egg, breadcrumbs\n• Freeze for 30 minutes\n• Deep fry until golden\n• Serve with marinara sauce", cookingTime: 15, servings: 4 },
    { title: "Onion Rings", ingredients: ["onions", "flour", "milk", "oil", "spices"], instructions: "• Slice onions into rings\n• Make batter with flour and milk\n• Dip rings in batter\n• Deep fry until crispy\n• Drain and season", cookingTime: 20, servings: 4 },
    { title: "Chicken Wings", ingredients: ["chicken wings", "hot sauce", "butter", "garlic"], instructions: "• Bake wings until crispy\n• Mix hot sauce with butter\n• Toss wings in sauce\n• Serve with celery\n• Add blue cheese dip", cookingTime: 45, servings: 4 },
    { title: "Pretzels", ingredients: ["flour", "yeast", "salt", "baking soda"], instructions: "• Make dough with flour and yeast\n• Shape into pretzels\n• Boil in baking soda water\n• Bake until golden brown\n• Sprinkle with coarse salt", cookingTime: 60, servings: 8 },
    { title: "Trail Mix", ingredients: ["nuts", "dried fruits", "chocolate chips", "seeds"], instructions: "• Mix all ingredients together\n• Store in airtight container\n• Portion into small bags\n• Keep at room temperature\n• Enjoy as needed", cookingTime: 5, servings: 8 },
    { title: "Granola Bars", ingredients: ["oats", "honey", "nuts", "dried fruit", "butter"], instructions: "• Mix oats with nuts and fruit\n• Heat honey and butter\n• Combine wet and dry ingredients\n• Press into pan\n• Bake and cool before cutting", cookingTime: 30, servings: 12 },
    
    // Quick Snacks
    { title: "Peanut Butter Toast", ingredients: ["bread", "peanut butter", "banana", "honey"], instructions: "• Toast bread until golden\n• Spread peanut butter\n• Add sliced banana\n• Drizzle with honey\n• Serve immediately", cookingTime: 5, servings: 1 },
    { title: "Cheese Crackers", ingredients: ["crackers", "cheese", "grapes"], instructions: "• Arrange crackers on plate\n• Top with cheese slices\n• Add grapes on side\n• Serve at room temperature\n• Perfect for parties", cookingTime: 3, servings: 2 },
    { title: "Fruit Salad", ingredients: ["mixed fruits", "honey", "lime juice", "mint"], instructions: "• Cut fruits into bite-size pieces\n• Mix honey with lime juice\n• Toss fruits with dressing\n• Garnish with mint\n• Chill before serving", cookingTime: 10, servings: 4 },
    { title: "Smoothie Bowl", ingredients: ["frozen fruits", "yogurt", "granola", "nuts"], instructions: "• Blend frozen fruits with yogurt\n• Pour into bowl\n• Top with granola\n• Add nuts and seeds\n• Serve immediately", cookingTime: 5, servings: 1 },
    { title: "Veggie Sticks", ingredients: ["carrots", "celery", "cucumber", "hummus"], instructions: "• Cut vegetables into sticks\n• Arrange on serving plate\n• Serve with hummus\n• Keep vegetables crisp\n• Perfect healthy snack", cookingTime: 8, servings: 4 },
    { title: "Rice Cakes", ingredients: ["rice cakes", "avocado", "tomato", "salt"], instructions: "• Mash avocado with salt\n• Spread on rice cakes\n• Top with tomato slices\n• Season with pepper\n• Serve fresh", cookingTime: 5, servings: 2 },
    { title: "Energy Balls", ingredients: ["dates", "nuts", "cocoa powder", "coconut"], instructions: "• Blend dates until smooth\n• Add nuts and cocoa\n• Form into balls\n• Roll in coconut\n• Chill until firm", cookingTime: 15, servings: 12 },
    { title: "Banana Chips", ingredients: ["bananas", "oil", "salt"], instructions: "• Slice bananas thinly\n• Deep fry until crispy\n• Drain excess oil\n• Season with salt\n• Store in airtight container", cookingTime: 20, servings: 4 },
    { title: "Roasted Chickpeas", ingredients: ["chickpeas", "olive oil", "spices", "salt"], instructions: "• Drain and dry chickpeas\n• Toss with oil and spices\n• Roast until crispy\n• Season with salt\n• Cool before serving", cookingTime: 40, servings: 4 },
    { title: "Stuffed Dates", ingredients: ["dates", "cream cheese", "nuts", "honey"], instructions: "• Remove pits from dates\n• Mix cream cheese with honey\n• Stuff dates with mixture\n• Top with chopped nuts\n• Chill before serving", cookingTime: 10, servings: 6 },
    
    // Sweet Snacks
    { title: "Chocolate Chip Cookies", ingredients: ["flour", "butter", "sugar", "chocolate chips", "eggs"], instructions: "• Cream butter and sugar\n• Add eggs and flour\n• Fold in chocolate chips\n• Bake until golden\n• Cool on wire rack", cookingTime: 25, servings: 24 },
    { title: "Brownies", ingredients: ["chocolate", "butter", "sugar", "eggs", "flour"], instructions: "• Melt chocolate with butter\n• Beat in sugar and eggs\n• Add flour and mix\n• Bake in square pan\n• Cool before cutting", cookingTime: 35, servings: 16 },
    { title: "Muffins", ingredients: ["flour", "sugar", "eggs", "milk", "berries"], instructions: "• Mix dry ingredients\n• Combine wet ingredients\n• Fold together gently\n• Add berries\n• Bake in muffin tins", cookingTime: 25, servings: 12 },
    { title: "Donuts", ingredients: ["flour", "sugar", "yeast", "milk", "oil"], instructions: "• Make dough with yeast\n• Let rise until doubled\n• Shape into donuts\n• Deep fry until golden\n• Glaze while warm", cookingTime: 90, servings: 12 },
    { title: "Ice Cream Sandwich", ingredients: ["cookies", "ice cream"], instructions: "• Soften ice cream slightly\n• Place scoop between cookies\n• Press gently together\n• Wrap and freeze\n• Serve frozen", cookingTime: 5, servings: 1 },
    { title: "Fruit Popsicles", ingredients: ["fruit juice", "fresh fruits", "honey"], instructions: "• Mix juice with honey\n• Add chopped fruits\n• Pour into popsicle molds\n• Freeze until solid\n• Run under warm water to remove", cookingTime: 10, servings: 6 },
    { title: "Chocolate Bark", ingredients: ["chocolate", "nuts", "dried fruit", "sea salt"], instructions: "• Melt chocolate until smooth\n• Spread on parchment paper\n• Sprinkle with toppings\n• Add pinch of sea salt\n• Chill until set", cookingTime: 15, servings: 12 },
    { title: "Rice Krispie Treats", ingredients: ["rice cereal", "marshmallows", "butter"], instructions: "• Melt butter and marshmallows\n• Add rice cereal\n• Mix until coated\n• Press into pan\n• Cool before cutting", cookingTime: 15, servings: 12 },
    { title: "Caramel Apples", ingredients: ["apples", "caramel", "nuts", "sticks"], instructions: "• Insert sticks into apples\n• Melt caramel until smooth\n• Dip apples in caramel\n• Roll in chopped nuts\n• Let cool on parchment", cookingTime: 20, servings: 6 },
    { title: "Fudge", ingredients: ["chocolate", "condensed milk", "butter", "vanilla"], instructions: "• Melt chocolate with milk\n• Add butter and vanilla\n• Beat until thick\n• Pour into lined pan\n• Chill until firm", cookingTime: 20, servings: 16 },
    
    // Savory Snacks
    { title: "Deviled Eggs", ingredients: ["eggs", "mayonnaise", "mustard", "paprika"], instructions: "• Hard boil eggs\n• Cut in half and remove yolks\n• Mix yolks with mayo and mustard\n• Pipe back into whites\n• Sprinkle with paprika", cookingTime: 20, servings: 6 },
    { title: "Stuffed Mushrooms", ingredients: ["mushrooms", "cream cheese", "herbs", "breadcrumbs"], instructions: "• Remove mushroom stems\n• Mix cream cheese with herbs\n• Stuff mushroom caps\n• Top with breadcrumbs\n• Bake until golden", cookingTime: 25, servings: 6 },
    { title: "Spinach Dip", ingredients: ["spinach", "cream cheese", "sour cream", "garlic"], instructions: "• Thaw and drain spinach\n• Mix with cream cheese\n• Add sour cream and garlic\n• Bake until bubbly\n• Serve with chips", cookingTime: 30, servings: 8 },
    { title: "Bruschetta", ingredients: ["bread", "tomatoes", "basil", "garlic", "olive oil"], instructions: "• Toast bread slices\n• Rub with garlic\n• Top with diced tomatoes\n• Add fresh basil\n• Drizzle with olive oil", cookingTime: 15, servings: 6 },
    { title: "Quesadillas", ingredients: ["tortillas", "cheese", "peppers", "onions"], instructions: "• Fill tortillas with cheese\n• Add peppers and onions\n• Cook until crispy\n• Cut into wedges\n• Serve with salsa", cookingTime: 10, servings: 4 },
    { title: "Mini Pizzas", ingredients: ["english muffins", "pizza sauce", "cheese", "toppings"], instructions: "• Split english muffins\n• Spread with pizza sauce\n• Add cheese and toppings\n• Bake until cheese melts\n• Serve hot", cookingTime: 12, servings: 4 },
    { title: "Jalapeño Poppers", ingredients: ["jalapeños", "cream cheese", "bacon", "breadcrumbs"], instructions: "• Cut jalapeños in half\n• Remove seeds\n• Fill with cream cheese\n• Wrap with bacon\n• Bake until crispy", cookingTime: 25, servings: 6 },
    { title: "Cheese Balls", ingredients: ["cream cheese", "cheddar", "nuts", "herbs"], instructions: "• Mix cheeses until smooth\n• Add herbs and seasonings\n• Form into balls\n• Roll in chopped nuts\n• Chill until firm", cookingTime: 15, servings: 8 },
    { title: "Pigs in Blanket", ingredients: ["sausages", "pastry", "mustard"], instructions: "• Wrap sausages in pastry\n• Brush with egg wash\n• Bake until golden\n• Serve with mustard\n• Perfect party snack", cookingTime: 20, servings: 12 },
    { title: "Garlic Bread", ingredients: ["bread", "butter", "garlic", "parsley"], instructions: "• Mix butter with minced garlic\n• Add chopped parsley\n• Spread on bread slices\n• Bake until golden\n• Serve warm", cookingTime: 15, servings: 6 }
];

const addSnacks = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        await Recipe.insertMany(snackRecipes);
        console.log(`${snackRecipes.length} snack recipes added successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error adding snacks:', error);
        process.exit(1);
    }
};

addSnacks();