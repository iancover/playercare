const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController.js');

// Routes
router.route('/').get(auth, getNotes).post(auth, createNote);
router
  .route('/:id')
  .get(auth, getNote)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

module.exports = router;
