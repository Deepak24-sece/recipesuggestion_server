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
const corsOptions = {
    origin: ['https://singular-boba-04e055.netlify.app', 'http://localhost:5173', 'http://localhost:5000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Middleware to check DB connection
app.use((req, res, next) => {
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    if (mongoose.connection.readyState !== 1 && req.path.startsWith('/api')) {
        return res.status(503).json({
            message: 'Service Unavailable: Database not connected',
            hint: 'Please check MONGODB_URI in environment variables'
        });
    }
    next();
});

// Database Connection
connectDB();

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/admin', adminRoutes);

// Check for essential env vars
if (!process.env.MONGODB_URI) {
    console.error('FATAL ERROR: MONGODB_URI is not defined in environment variables.');
    // We don't exit here immediately to allow the server to start and show the error on the root route for easier debugging,
    // but the db connection attempting will likely fail/exit.
}

app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({
        message: 'Recipe Suggestion App Backend is running',
        dbStatus,
        envCheck: {
            mongoURI: process.env.MONGODB_URI ? 'Defined' : 'Missing',
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
