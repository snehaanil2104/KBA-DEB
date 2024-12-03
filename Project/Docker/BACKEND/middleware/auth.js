const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Check if the user role matches allowed roles
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access Denied' });
            }
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid Token' });
        }
    };
};

module.exports = auth;


