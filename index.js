'use strict';

require('dotenv').config();
const server = require('./server.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

server.start(process.env.PORT);
