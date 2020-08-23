const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passportSetup = require('./passport-setup');
const path = require('path');

// Routers
const authRouter = require('./routes/auth.route');
const scheduleRouter = require('./routes/schedule.route');
const toDoRouter = require('./routes/toDo.route');

// Initialize our Express server
const app = express();

// Require our environment variables
require('dotenv').config();
require('./passport-setup.js');

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
app.use('/assets', express.static(__dirname + 'public/assets'))
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Routes
app.use('/auth', authRouter);
app.use('/schedule', scheduleRouter);
app.use('/todo', toDoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`[+] Express server listening on port ${PORT}`));

