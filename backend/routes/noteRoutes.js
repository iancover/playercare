const express = require('express');
const router = express.Router({ mergeParams: true });

// Controllers
const { getNotes, addNote } = require('../controllers/noteController.js');
// Middleware
const auth = require('../middleware/authMiddleware');

// Routes
router.route('/').get(auth, getNotes).post(auth, addNote);

module.exports = router;
