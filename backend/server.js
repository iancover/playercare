// Modules
const express = require('express');
const colors = require('colors');
require('dotenv').config();


// App init & config
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hi there!');
});

app.listen((port = process.env.PORT), () => {
  console.log(colors.cyan(`App listening on PORT: ${port}`));
});

// use 'ip' to view current IP for VPN/MongoDB conflicts
