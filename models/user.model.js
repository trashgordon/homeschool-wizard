const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PasswordComplexity = require('joi-password-complexity');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

require('dotenv').config()

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
  return token;
}

const complexityOptions = {
  min: 8,
  max: 25,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4
};

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi
      .string()
      .min(1)
      .max(30)
      .required(),
    lastName: Joi
      .string()
      .min(1)
      .max(30)
      .required(),
    email: Joi
      .string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: PasswordComplexity(complexityOptions).required()
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;