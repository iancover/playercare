const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs'); // hash pwd to store in db
const jwt = require('jsonwebtoken'); // token for auth
const JWT_SECRET = process.env.JWT_SECRET;

// Model
const User = require('../models/userModel');

/** POST
 * @desc    Register new user
 * @route   /api/users
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res) => {
  // input data
  const { name, email, password } = req.body;

  // input validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  // check if user exists
  const userExists = await User.exists({ email: email }); // or { email }
  if (userExists) {
    res.status(400);
    throw new Error(`User already exists.`);
  }

  // hash pwd
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name: name,
    email: email,
    password: hashPwd,
  });

  // send response
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/** POST
 * @desc    Login user
 * @route   /api/users/login
 * @access  Public
 */
exports.loginUser = asyncHandler(async (req, res) => {
  // get email & pwd
  const { email, password } = req.body;

  // find user by email
  const user = await User.findOne({ email });

  // check pwds match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials.');
  }
});

/** GET
 * @desc    Current auth user
 * @route   /api/users/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };

  res.status(200).json(user);
});

// 30-day JWT token w/user ID
function generateToken(id) {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
}
