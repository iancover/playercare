const asyncHandler = require('express-async-handler');

// Models
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

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

// @desc    Get note by Id
// @route   GET   /api/tickets/:ticketId/notes/:id
// @access  Private - auth user id/jwt in local storage
exports.getNote = asyncHandler(async (req, res) => {
  // verify user in db
  const user = await User.findById(req.user.id);
  // note: 'auth' stores 'Bearer <token>' in 'req.user'
  if (!user) {
    res.status(401); // if auth token expired
    throw new Error('Unauthorized, please log in.');
  }
  // verify ticket in db
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404); // if ticket was deleted
    throw new Error('Ticket not found');
  }
  // verify note.id in params & exists in db
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404); // note was deleted
    throw new Error('Note not found.');
  }
  // verify user is author and referenced ticket
  if (note.user.toString() !== req.user.id) {
    res.status(403); // not author of note
    throw new Error('Restricted access.');
  }
  if (note.ticket.toString() !== req.params.ticketId) {
    res.status(404); // ticket deleted
    throw new Error('Ticket not found.');
  }
  res.status(200).json(note);
});

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

// @desc    Update note by Id
// @route   PUT   /api/tickets/:ticketId/notes/:id
// @access  Private - auth user id/jwt in local storage
exports.updateNote = asyncHandler(async (req, res) => {
  // verify user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401); // if auth token expired
    throw new Error('Unauthorized, please log in.');
  }
  // verify ticket
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404); // if ticket was deleted
    throw new Error('Ticket not found');
  }
  // verify note, author and ticket ref
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404); // note was deleted
    throw new Error('Note not found.');
  }
  if (note.user.toString() !== req.user.id) {
    res.status(403); // not author of note
    throw new Error('Restricted access.');
  }
  if (note.ticket.toString() !== req.params.ticketId) {
    res.status(404); // ticket deleted
    throw new Error('Ticket not found.');
  }
  // update note by id & return modified note
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedNote);
});

// @desc    Delete note by Id
// @route   DELETE   /api/tickets/:ticketId/notes/:id
// @access  Private - auth user id/jwt in local storage
exports.deleteNote = asyncHandler(async (req, res) => {
  // verify user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401); // if auth token expired
    throw new Error('Unauthorized, please log in.');
  }
  // verify ticket
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404); // if ticket was deleted
    throw new Error('Ticket not found');
  }
  // verify note, author & ticket ref
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404); // note was deleted
    throw new Error('Note not found.');
  }
  if (note.user.toString() !== req.user.id) {
    res.status(403); // not author of note
    throw new Error('Restricted access.');
  }
  if (note.ticket.toString() !== req.params.ticketId) {
    res.status(404); // ticket deleted
    throw new Error('Ticket not found.');
  }
  // delete note
  await note.deleteOne();
  res
    .status(200)
    .json({ success: true, deletedId: req.params.id, text: note.text });
});
