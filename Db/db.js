const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        // Exit process with failure so that the deployment platform knows the app is unhealthy
        process.exit(1);
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