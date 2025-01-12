const authorize = (allowedRoles) => (req, res, next) => {
    const userRole = req.user.role_id; // Extract user's role from the JWT payload
    if (!allowedRoles.includes(userRole)) {
        return res.status(403).send({ error: 'Access denied: You do not have permission to access this route.' });
    }
    next();
};

module.exports = authorize;