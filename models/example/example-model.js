'use strict';

const Model = require('../mongo.js');
const schema = require('./example-schema.js');

class Example extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Example;
