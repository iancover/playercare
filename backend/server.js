// Modules
const express = require('express');
const path = require('path');
const timestamp = require('time-stamp');
const colors = require('colors');
require('dotenv').config();

// Middleware
const { errorHandler } = require('./middleware/errorMiddleware');

// MongoDB
const connectDB = require('./config/db.js');
connectDB();

// App init
const app = express();

// App config
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // true = 'qs' library

// Mount routes
app.use('/api/users', require('./routes/userRoutes'));

// Routes
app.get('/', (req, res) => {
  res.status(201).json({ message: 'Ticket-System Output and User Platform' });
});

// Handle errors
app.use(errorHandler);

// Server
app.listen((port = process.env.PORT || 8000), () => {
  let time = timestamp('HH:mm:ss');
  console.log(
    colors.cyan(
      `Server listening on PORT: ${port.yellow} at TIME: ${time.yellow}`
    )
  );
});
