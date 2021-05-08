"use strict";

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mean-login", {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("Db is connected");
})["catch"](function (err) {
  return console.log("Error", err);
});