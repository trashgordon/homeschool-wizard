const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Task = require('../models/task.model');

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('schedule', {tasks: tasks});
});

router.post('/api/tasks', (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    notes: req.body.notes,
    tag: req.body.tag
  });

  task
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  
  res.status(201).json({
    message: "Handling POST requests to /schedule/api/tasks",
    createdTask: task
  })

});

module.exports = router;