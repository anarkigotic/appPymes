'use stric'
var express = require('express');
var pymeController = require('../controllers/pyme.controller');

var api = express.Router();


api.get('', pymeController.getAll);
api.get('/:id', pymeController.getPyme);
api.post('/create', pymeController.createPyme);
api.put('/:id', pymeController.updatePyme);


module.exports = api;


