const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  note: {
    type: String
  }
});

const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo;