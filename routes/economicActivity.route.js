'use stric'
var express = require('express');
var ActivityEconomicController = require('../controllers/economicActivity');

var api = express.Router();


api.get('', ActivityEconomicController.getAll);
api.get('/:id', ActivityEconomicController.getActivity);
api.post('/create', ActivityEconomicController.createActivity);
api.put('/:id', ActivityEconomicController.updateActivity);
api.delete('/:id', ActivityEconomicController.deleteActivity);


module.exports = api;