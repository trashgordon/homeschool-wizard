const _ = require('lodash');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const { User, validate } = require('../models/user.model');

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register Handle
router.post('/register', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res
    .status(400)
    .send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res
    .status(400)
    .send('User is already registered');
  
  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
});

module.exports = router;