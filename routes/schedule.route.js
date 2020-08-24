const auth = require('../middleware/auth');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Event = require('../models/event.model');



// Get all events
router.get('/', auth, async (req, res) => {
  const user = req.user;
  const events = await Event.find().sort({startTime : 1});
  res.render('schedule', { events: events, user: user });
});

// Create an event
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
    })
    .catch(err => console.log(err));

  res.redirect('/schedule');
});

// Delete an event
router.delete('/api/events/:id', (req, res) => {
  Event
    .find({ _id: req.params.item })
    .deleteOne((err, data) => {
      if (err) throw err;
      res.json(data);
    });
});

module.exports = router;