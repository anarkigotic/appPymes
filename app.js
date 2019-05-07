'use strict'
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var routePyme = require('./routes/pyme.route');
var app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
app.use(bodyParser.json({ limit: '50mb', extended: true, parameterLimit: 100000 }));

app.use(cors({ origin: true, credentials: true }))


app.use('/pyme', routePyme);

module.exports = app;