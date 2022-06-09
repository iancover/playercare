const asyncHandler = require('express-async-handler');

// Models
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    All tickets
// @route   GET   /api/tickets
// @access  Private - auth user id/jwt in local storage
exports.getTickets = asyncHandler(async (req, res) => {
  // get user by Id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc    Ticket by Id
// @route   GET   /api/tickets/:id
// @access  Private - auth user id/jwt in local storage
exports.getTicket = asyncHandler(async (req, res) => {
  // get user by id
  const user = await User.findById(req.user.id);

  // validate auth user is in db
  if (!user) {
    res.status(401);
    throw new Error('User not found, try logging back in.');
    // error: jwt session may be expired
  }

  // get ticket by id
  const ticket = await Ticket.findById(req.params.id);

  // verify ticket exists
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found.');
  }

  // verify current user owns ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not Authorized');
  }

  // return ticket obj
  res.status(200).json(ticket);
});

// @desc    Create new ticket
// @route   POST  /api/tickets
// @access  Private - auth user id/jwt in local storage
exports.createTicket = asyncHandler(async (req, res) => {
  // get form input values
  const { platform, issue, description } = req.body;

  // validate required fields
  if (!platform || !issue || !description) {
    res.status(400);
    throw new Error('Missing platform, issue or description.');
  }

  // init/get user by id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // create/get & return new ticket
  const ticket = await Ticket.create({
    platform,
    issue,
    description,
    user: user.id,
    status: 'open',
  });
  res.status(201).json(ticket);
});

// @desc    Update ticket by Id
// @route   PUT   /api/tickets/:id
// @access  Private - auth user id/jwt in local storage
exports.updateTicket = asyncHandler(async (req, res) => {
  // get user by id & validate
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found, try logging back in.');
  }

  // get/verify existing ticket & user authorization
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found.');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not Authorized');
  }

  // update w/req.body doc fields, select 'new' to return updated
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

// @desc    Delete ticket by Id
// @route   DELETE   /api/tickets/:id
// @access  Private - auth user id/jwt in local storage
exports.deleteTicket = asyncHandler(async (req, res) => {
  // get user by id & validate
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found, try logging back in.');
  }

  // get/verify existing ticket & user authorization
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found.');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not Authorized');
  }

  // delete ticket
  await ticket.deleteOne();

  res.status(200).json({ success: true, deletedId: req.params.id });
});
