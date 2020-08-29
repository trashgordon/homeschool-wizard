const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./models/user.model');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {

    // check if user already exists in database
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    });


  })
);