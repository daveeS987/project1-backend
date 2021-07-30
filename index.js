'use strict';

require('dotenv').config();
const server = require('./server.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongo Succesfully Connected');
});

server.start(process.env.PORT);
