const Joi = require('joi');
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  startTime: '',
  duration: ''
});

const Event = mongoose.model('Event', EventSchema);



// Event name
// start time
// duration

// Study math workbook
// 11:00
// 45 minutes