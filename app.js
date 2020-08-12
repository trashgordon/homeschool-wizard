const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');

// Initialize our Express server
const app = express();

// Require our environment variables
require('dotenv').config();

// Connect to MongoDB database
mongoose
  .connect(process.env.HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`[+] Connected to MongoDB at ${process.env.HOST}`);
  })
  .catch(err => {
    console.log(`[-] Cannot connect to MongoDB at ${process.env.HOST}`);
  })

// Middleware
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user.route'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`[+] Express server listening on port ${PORT}`));