'use stric'
var express = require('express');
var publicacionController = require('../controllers/publicacion.controller');

var api = express.Router();


api.post('/:id', publicacionController.create);
api.get('/:id', publicacionController.getDescripcion);


module.exports = api;