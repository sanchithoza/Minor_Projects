const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token
    const decodedToken = jwt.verify(token, 'your-secret-key');

    // Attach the decoded user data to the request object
    req.user = decodedToken;

    next(); // Move to the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
