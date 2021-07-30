'use strict';

const User = require('../models/user-model.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  }

  try {
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await User.authenticateWithToken(token);
    req.user = validUser;
    req.token = token;
    next();
  } catch (error) {
    console.log('Error from Bearer Auth: ', error);
    next('Invalid Login');
  }
};
