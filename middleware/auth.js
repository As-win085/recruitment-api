const jwt = require('jsonwebtoken');

/**
 * Middleware to protect private routes
 * Verifies the JWT sent in the Authorization header
 */
const auth = (req, res, next) => {
    // 1. Get token from header (Format: Bearer <token>)
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: "Access Denied. No token provided or invalid format." 
        });
    }

    // 2. Extract the token string
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verify token using the secret key from .env
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach user data (id) to the request object for use in controllers
        req.user = verified; 
        
        // 5. Move to the next middleware or controller
        next();
    } catch (err) {
        res.status(403).json({ 
            success: false, 
            message: "Invalid or expired token." 
        });
    }
};

module.exports = auth;