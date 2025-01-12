const jwt = require('jsonwebtoken');

// Middleware to authenticate users
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from the header
    if (!token) return res.status(401).send({ error: 'Access denied: No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (err) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

module.exports = authenticate;
