const express = require('express');
const router = express.Router();

// serve ToDo page
router.get('/', async (req, res) => {
  res.render('toDo');
});

module.exports = router;