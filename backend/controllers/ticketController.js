const asyncHandler = require('express-async-handler');

// Models
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    All user tickets
// @route   GET  /api/tickets
// @access  Private
exports.getTickets = asyncHandler(async (req, res) => {
  // get user w/id from jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc    Create new ticket
// @route   POST  /api/tickets
// @access  Private
exports.createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'createTicket' });
});
