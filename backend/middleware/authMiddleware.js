const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
// Model
const User = require('../models/userModel');

/** Auth Middleware
 * @desc  Verify auth and create session token
 */
const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check for authorization header and token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from 'Bearer <token>'
      token = req.headers.authorization.split(' ')[1];
      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      // Call next piece of middleware
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = auth;
