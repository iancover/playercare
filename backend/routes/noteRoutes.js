const express = require('express');
const router = express.Router({ mergeParams: true });

// Controllers
const {
  getNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController.js');
// Middleware
const auth = require('../middleware/authMiddleware');

// Routes
router.route('/').get(auth, getNotes).post(auth, addNote);
router
  .route('/:id')
  .get(auth, getNote)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

module.exports = router;
