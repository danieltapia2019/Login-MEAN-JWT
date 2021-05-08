"use strict";

var express = require('express');

var cors = require('cors');

var morgan = require('morgan');

var app = express();
app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/api/v1', require('./routes/user.routes'));
module.exports = app;