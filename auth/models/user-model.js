'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: 'admin',
    enum: ['guest', 'author', 'editor', 'admin'],
  },
});

user.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const roles = {
  guest: ['read'],
  author: ['read', 'create'],
  editor: ['read', 'update', 'delete'],
  admin: ['read', 'create', 'update', 'delete'],
};

user.methods.can = function (capability) {
  return roles[this.role].includes(capability);
};

user.methods.generateToken = function () {
  const obj = {
    username: this.username,
    role: this.role,
    permissions: roles[this.role],
  };
  const options = {
    expiresIn: 600,
  };
  const token = jwt.sign(obj, process.env.SECRET, options);
  return token;
};

user.statics.validateBasic = async function (userName, password) {
  const user = await this.findOne({ username: userName });
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : undefined;
};

user.statics.authenticateWithToken = function (token) {
  const parsedToken = jwt.verify(token, process.env.SECRET);
  const user = this.findOne({ username: parsedToken.username });
  return user;
};

module.exports = mongoose.model('user', user);
