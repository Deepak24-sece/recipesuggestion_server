const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Db/db');
const recipeRoutes = require('./Routes/recipeRoutes');
const authRoutes = require('./Routes/authRoutes');
const favoritesRoutes = require('./Routes/favoritesRoutes');
const adminRoutes = require('./Routes/adminRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://singular-boba-04e055.netlify.app', 'http://localhost:5173', 'http://localhost:5000'],
    credentials: true
}));

// Database Connection
connectDB();

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Recipe Suggestion App Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
