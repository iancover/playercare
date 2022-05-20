const router = require('express').Router();

// Controllers
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

// Middleware
const auth = require('../middleware/authMiddleware');

// /users
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getMe);

module.exports = router;
