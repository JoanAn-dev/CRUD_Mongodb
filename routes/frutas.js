'use strict'

var express= require('express');
var FrutaController= require('../contolllers/frutas');
var api = express.Router();

api.get('/pruebas', FrutaController.pruebas);

api.post('/fruta',FrutaController.saveFruta);

api.get('/frutas',FrutaController.getFrutas);

api.get('/fruta/:id',FrutaController.getFrutaId);

api.put('/fruta/:id',FrutaController.updateFruta);


module.exports = api;