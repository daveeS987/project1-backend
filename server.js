'use strict';

const express = require('express');

const app = express();
const cors = require('cors');

const notFoundHandler = require('./middleware/500.js');
const errorHandler = require('./middleware/500.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.status(200).send('This is the home route');
});

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('Listening on port: ', port)),
};
