'use strict';

const base64 = require('base-64');
const User = require('../models/user-model.js');

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const encoded = authorization.split(' ')[1];
    const creds = base64.decode(encoded);
    const [username, password] = creds.split(':');

    const userRecord = await User.validateBasic(username, password);

    req.user = userRecord;
    console.log('🚀 ~ req.user', req.user);
    req.token = userRecord.generateToken();
    console.log('🚀 ~ req.token', req.token);

    next();
  } catch (error) {
    console.log('Error happened in basic auth: ', error);
    next('Invalid Login');
  }
};
