const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Event = require('../models/event.model');

// serve Schedule page
router.get('/', async (req, res) => {
  const events = await Event.find().sort({startTime : 1});
  res.render('schedule', {events: events});
});

// create a new event
router.post('/api/events', (req, res, next) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    notes: req.body.notes,
    tag: req.body.tag
  });

  event
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.redirect('/schedule');
});

module.exports = router;