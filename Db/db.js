const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        // Fix commonly added quotes or whitespace in Render env vars
        const uri = process.env.MONGODB_URI.trim().replace(/^["']|["']$/g, '');
        await mongoose.connect(uri);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        // Do not exit process, so we can return nice 503 errors
    }
};

// Connection event listeners 
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');

});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = connectDB;