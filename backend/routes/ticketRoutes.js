// Router
const express = require('express');
const router = express.Router();

// Controller
const { getTickets, createTicket } = require('../controllers/ticketController');

// Middleware
const auth = require('../middleware/authMiddleware');

// Routes
router.route('/').get(auth, getTickets).post(auth, createTicket);

module.exports = router;
