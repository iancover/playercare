// Modules
const express = require('express');
const colors = require('colors');
require('dotenv').config();

// App init
const app = express();

// App config
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  // res.status(200).send('T-Soup app');
  res.status(201).json({ message: 'Ticket-System Output and User Platform' });
});

app.use('/api/users', require('./routes/userRoutes'));

// Server
app.listen((port = process.env.PORT || 8000), () => {
  console.log(colors.cyan(`App listening on PORT: ${port}`));
});

// use 'ip' to view current IP for VPN/MongoDB conflicts
