const _ = require('lodash');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const { User, validate } = require('../models/user.model');

// serve Register page
router.get('/', (req, res) => {
  res.render('login');
});

module.exports = router;