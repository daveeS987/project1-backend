'use strict';

const Model = require('../mongo.js');
const schema = require('./category-schema.js');

class Categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Categories;
