const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Check for Authorization header with Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user ID from token to request object
      req.user = decoded.id;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

module.exports = { protect };
