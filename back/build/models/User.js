"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var userSchema = new Schema({
  email: String,
  password: String
}, {
  timestamps: true
});
module.exports = model('User', userSchema);