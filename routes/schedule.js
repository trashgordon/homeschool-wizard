const express = require('express');
const router = express.Router();

const tasks = [
  {
    name : 'Math workbook',
    startTime : '4:00 PM',
    endTime : '5:00 PM',
    notes: 'Pages 56-65',
    tag: 'Math'
  },
  {
    name : 'Read Brave New World',
    startTime : '3:00 PM',
    endTime : '4:00 PM',
    notes: 'Pages 112-145',
    tag: null
  },
  {
    name : 'Finger paint mural',
    startTime : '11:00 AM',
    endTime : '11:30 AM',
    notes: null,
    tag: 'Art'
  }
]

router.get('/', (req, res) => {
  res.render('schedule', {tasks: tasks});
});

module.exports = router;