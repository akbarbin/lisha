'use strict';

//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an object that shows
// the shape of your database entries.

var TodoSchema = new Schema({
  author: String,
  title: String,
  description: String,
  status: String,
  assign_to: String,
  estimated_duration: Number,
  real_duration: Number,
  type: String
})

module.exports = mongoose.model('Todo', TodoSchema);