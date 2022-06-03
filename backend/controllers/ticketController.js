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
  // get input values { user, product, description, status }
  const { platform, issue, description } = req.body;

  // validate
  if (!platform || !issue || !description) {
    res.status(400);
    throw new Error('Missing platform, issue or description.');
  }

  // get user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // create and return ticket data
  const ticket = await Ticket.create({
    platform,
    issue,
    description,
    user: user.id,
    status: 'open',
  });

  res.status(201).json(ticket);
});
