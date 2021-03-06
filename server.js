'use strict';

const express = require('express');

const app = express();
const cors = require('cors');

const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./auth/routes/auth-routes.js');
const v1routes = require('./api/v1.js');
const v2routes = require('./api/v2.js');

app.use(timeStamp);
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use('/api/v1/', v1routes);
app.use('/api/v2/', v2routes);

app.get('/', (req, res, next) => {
  res.status(200).send('This is the home route');
});

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('Listening on port: ', port)),
};
