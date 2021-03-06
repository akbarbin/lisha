'use strict';

//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an object that shows
// the shape of your database entries.

var CommentSchema = new Schema({
  author: String,
  text: String
})

module.exports = mongoose.model('Comment', CommentSchema);