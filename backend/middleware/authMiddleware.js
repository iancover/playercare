const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
// Model
const User = require('../models/userModel');

// Middleware to auth user
const auth = asyncHandler(async (req, res, next) => {
  let token;

  // check auth header & Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // extract & decode token
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user w/decoded & call next piece of middleware
      req.user = await User.findById(decoded.id).select('-password');
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
