'use strict';

const express = require('express');

const app = express();

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('Listening on port: ', port)),
};
