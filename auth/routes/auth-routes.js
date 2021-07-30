'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user-model.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const permission = require('../middleware/acl.js');

router.post('/signup', handleSignUp);
router.post('/signin', basicAuth, handleSignIn);

// ------------ Examples and Test Routes -------------- //
router.post('/allUsers', bearerAuth, getAllusers);
router.get('/article', bearerAuth, permission('update'), userCanUpdate);
// ---------------------------------------------------- //

async function handleSignUp(req, res, next) {
  try {
    const obj = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    };

    const record = new User(obj);
    const newUser = await record.save();
    const token = record.generateToken();

    const output = {
      user: newUser,
      token: token,
    };

    res.set('auth', token);
    res.status(200).json(output);
  } catch (error) {
    next(error.message);
  }
}

async function handleSignIn(req, res, next) {
  try {
    const output = {
      user: req.user,
      token: req.token,
    };
    res.set('auth', req.token);
    res.status(200).json(output);
  } catch (error) {
    next(error.message);
  }
}

// ------------ Examples and Test Routes -------------- //
async function getAllusers(req, res, next) {
  try {
    const allUsers = await User.find({});
    res.set('auth', req.token);
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
}
// ------------ Examples and Test Routes -------------- //
function userCanUpdate(req, res, next) {
  res.status(200).send('You can update it');
}

module.exports = router;
