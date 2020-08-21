const express = require('express');
const router = express.Router();

// serve toDo page
router.get('/', (req, res) => {
  res.render('toDo');
});

module.exports = router;

