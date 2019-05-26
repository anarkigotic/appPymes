'use stric'
var express = require('express');
var profileController = require('../controllers/profile.controller');

var api = express.Router();


api.get('/profile/:id', profileController.profilePyme);


module.exports = api;