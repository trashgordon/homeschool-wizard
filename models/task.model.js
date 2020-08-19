const Joi = require('joi');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
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

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;