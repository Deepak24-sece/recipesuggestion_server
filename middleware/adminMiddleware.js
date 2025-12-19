const jwt = require('jsonwebtoken');
const Admin = require('../Model/adminModel');

const adminProtect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

            // Check if it's admin token
            if (decoded.id !== 'admin123') {
                return res.status(401).json({ message: 'Not authorized as admin' });
            }

            // Set admin info
            req.admin = { id: 'admin123', username: 'admin' };

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { adminProtect };