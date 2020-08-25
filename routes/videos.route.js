const auth = require('../middleware/auth');
const express = require('express');
const { google } = require('googleapis');
const router = express.Router();
require('dotenv').config();

// Get all videos
router.get('/', auth, async (req, res) => {
  google.youtube('v3').search.list({
    key: process.env.apiKey,
    part: [ 'id', 'snippet' ],
    q: 'homeschool',
  }).then((response) => {
    const user = req.user;
    const videos = response.data;
    console.log(response.data);
    res.render('videos', { videos: videos, user: user });
    }).catch((err) => console.log(err));
});

module.exports = router;