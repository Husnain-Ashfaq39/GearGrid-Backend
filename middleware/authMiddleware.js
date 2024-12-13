const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (err) {
        console.error("Authentication middleware error:", err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware; 