const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    // 1. Check if the token exists in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the string (Format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token
            // Note: JWT_SECRET should be defined in your .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret');

            // 3. Attach user data to the request object to be used in Controllers
            req.user = decoded;

            // 4. Move to the next step (Controller)
            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            return res.status(401).json({ error: "Not authorized, invalid token" });
        }
    }

    // If no token is found
    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token provided" });
    }
};

module.exports = { protect };