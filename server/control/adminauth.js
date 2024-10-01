const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'shoe');
        
        if (!decoded.isAdmin) {
            throw new Error();
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate as an admin.' });
    }
};

module.exports = adminAuth;