// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");  // Load your secret key

const authMiddleware = (req, res, next) => {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "No token provided!" });
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;  // Attach payload to request object
        next();  // Pass control to the next middleware/route handler
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid or expired token!" });
    }
};

module.exports = authMiddleware;
