const asyncHandler = require('express-async-handler');

// Models
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc    Create note for ticket by Id
// @route   POST   /api/tickets/:ticketId/notes
// @access  Private - auth user id/jwt in local storage
exports.addNote = asyncHandler(async (req, res) => {
  // verify existing user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401); // if auth token expired
    throw new Error('Unauthorized, please log in.');
  }
  // verify existing ticket
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404); // if ticket was deleted
    throw new Error('Ticket not found');
  }
  // verify text from input
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw Error('Note cannot be empty, please enter text.');
  }
  // create note ref user & ticket in db & return new note
  const note = await Note.create({
    text,
    user: user.id,
    ticket: ticket.id,
  });
  res.status(201).json(note);
});

// @desc    All ticket notes
// @route   GET   /api/tickets/:ticketId/notes
// @access  Private - auth user id/jwt in local storage
exports.getNotes = asyncHandler(async (req, res) => {
  // get user by id in jwt and verify
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not authorized.');
  }
  // get ticket by id, verify ticket & author
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized.');
  }
  // get & return all ticket's notes from db
  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});





