const cookieSession = require('cookie-session');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// Routers
const authRouter = require('./routes/auth.route');
const scheduleRouter = require('./routes/schedule.route');
const toDoRouter = require('./routes/toDo.route');
const videosRouter = require('./routes/videos.route');
const passport = require('passport');

// Initialize our Express server
const app = express();

// Require our environment variables
require('dotenv').config();
require('./passport-setup');

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

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [ process.env.cookieKey ]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use('/assets', express.static(__dirname + 'public/assets'))
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Routes
app.use('/auth', authRouter);
app.use('/schedule', scheduleRouter);
app.use('/todo', toDoRouter);
app.use('/videos', videosRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`[+] Express server listening on port ${PORT}`));

