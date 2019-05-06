'use strict'
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var routePyme = require('./routes/pyme.route');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }))


app.use('/pyme',routePyme);

module.exports = app;


