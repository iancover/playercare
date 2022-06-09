// Router
const express = require('express');
const router = express.Router();

// Controller
const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

// Middleware
const auth = require('../middleware/authMiddleware');

// Routes
router.route('/').get(auth, getTickets).post(auth, createTicket);

router
  .route('/:id')
  .get(auth, getTicket)
  .put(auth, updateTicket)
  .delete(auth, deleteTicket);

module.exports = router;
