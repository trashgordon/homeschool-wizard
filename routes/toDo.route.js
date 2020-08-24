const auth = require('../middleware/auth');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const ToDo = require('../models/toDo.model');

// serve toDo page
router.get('/', auth, async (req, res) => {
  const user = req.user;
  const todos = await ToDo.find();
  res.render('toDo', { todos: todos, user: user });
});

// create a new todo
router.post('/api/todos', (req, res, next) => {
  const todo = new ToDo({
    _id: new mongoose.Types.ObjectId(),
    note: req.body.note
  });

  todo
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.redirect('/toDo');
});

module.exports = router;

