const Joi = require('joi');
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  notes: {
    type: String
  },
  tag: {
    type: String
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;