const asyncHandler = require('express-async-handler');
const colors = require('colors');

// Models
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc    All ticket notes
// @route   GET   /api/tickets/ticket/notes
// @access  Private - auth user id/jwt in local storage
exports.getNotes = asyncHandler(async (req, res) => {
  // fetch db docs w/user from req.user encoded as Bearer token
  const userRef = await User.findById(req.user.id);
  // and ticket which stores the ticketId
  const ticketRef = await Ticket.findById(req.body.ticket);

  if (!userRef) {
    res.status(401);
    throw new Error('User not found');
  }
  if (!ticketRef) {
    res.status(401);
    throw new Error('Ticket not found');
  }

  const notes = await Note.find({ user: userRef.id, ticket: ticketRef.id });
  res.status(200).json(notes);
});

// @desc    Get note by Id
// @route   GET   /api/tickets/ticket/notes/:id
// @access  Private - auth user id/jwt in local storage
exports.getNote = asyncHandler(async (req, res) => {
  // get user and ticket from db
  // note: 'auth' extracts 'Bearer <token>' & stores 'req.user'
  // and 'ticket' = id string
  const userRef = await User.findById(req.user.id);
  const ticketRef = await Ticket.findById(req.body.ticket);

  if (!userRef) {
    res.status(401); // if auth token expired
    throw new Error('Unauthorized, please log in.');
  }
  if (!ticketRef) {
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
  if (note.ticket.toString() !== req.body.ticket) {
    res.status(404); // ticket deleted
    throw new Error('Ticket not found.');
  }

  res.status(200).json(note);
});

// @desc    Create note for ticket by Id
// @route   POST   /api/tickets/:ticketId
// @access  Private - auth user id/jwt in local storage
exports.createNote = asyncHandler(async (req, res) => {
  // get text from input and ticketId
  const { text, ticket } = req.body;

  if (!text) {
    res.status(400);
    throw Error('Note cannot be empty, please enter text.');
  }

  // get user from req body
  const userRef = await User.findById(req.user._id);
  const ticketRef = await Ticket.findById(ticket);

  if (!userRef) {
    res.status(401); // if auth token expired
    throw new Error('Unauthorized, please log in.');
  }
  if (!ticketRef) {
    res.status(404); // if ticket was deleted
    throw new Error('Ticket not found');
  }

  // create in db
  const note = await Note.create({
    text,
    user: userRef.id,
    ticket: ticketRef.id,
  });

  res.status(201).json(note);
});

// @desc    Update note by Id
// @route   PUT   /api/tickets/ticket/notes/:id
// @access  Private - auth user id/jwt in local storage
exports.updateNote = asyncHandler(async (req, res) => {
  // get user & ticket to verify
  const userRef = await User.findById(req.user.id);
  const ticketRef = await Ticket.findById(req.body.ticket);

  if (!userRef) {
    res.status(401); // if auth token expired
    throw new Error('Unauthorized, please log in.');
  }
  if (!ticketRef) {
    res.status(404); // if ticket was deleted
    throw new Error('Ticket not found');
  }

  // fetch note to verify exists, author & ticket ref
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404); // note was deleted
    throw new Error('Note not found.');
  }
  if (note.user.toString() !== req.user.id) {
    res.status(403); // not author of note
    throw new Error('Restricted access.');
  }
  if (note.ticket.toString() !== req.body.ticket) {
    res.status(404); // ticket deleted
    throw new Error('Ticket not found.');
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

// @desc    Delete note by Id
// @route   DELETE   /api/tickets/ticket/notes/:id
// @access  Private - auth user id/jwt in local storage
exports.deleteNote = asyncHandler(async (req, res) => {
  // get user & ticket to verify
  const userRef = await User.findById(req.user.id);
  const ticketRef = await Ticket.findById(req.body.ticket);

  if (!userRef) {
    res.status(401); // if auth token expired
    throw new Error('Unauthorized, please log in.');
  }
  if (!ticketRef) {
    res.status(404); // if ticket was deleted
    throw new Error('Ticket not found');
  }

  // fetch note to verify exists, author & ticket ref
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404); // note was deleted
    throw new Error('Note not found.');
  }
  if (note.user.toString() !== req.user.id) {
    res.status(403); // not author of note
    throw new Error('Restricted access.');
  }
  if (note.ticket.toString() !== req.body.ticket) {
    res.status(404); // ticket deleted
    throw new Error('Ticket not found.');
  }

  await note.deleteOne();

  res
    .status(200)
    .json({ success: true, deletedId: req.params.id, text: note.text });
});
