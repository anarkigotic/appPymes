'use strict'
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var routePyme = require('./routes/pyme.route');
var routeProfile = require('./routes/profile.route');
var routePublicacion= require('./routes/publicacion.route');
var routeActivity = require('./routes/economicActivity.route');

var app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
app.use(bodyParser.json({ limit: '50mb', extended: true, parameterLimit: 100000 }));

app.use(cors({ origin: true, credentials: true }))


app.use('/pyme', routePyme);
app.use('/pyme', routeProfile);
app.use('/activity', routeActivity);
app.use('/publicacion', routePublicacion);

module.exports = app;