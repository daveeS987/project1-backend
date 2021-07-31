'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const category = mongoose.Schema({
  name: { type: String, required: true },
  subCategory: [String],
});

module.exports = mongoose.model('category', category);
