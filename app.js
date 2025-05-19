'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//CARGAR RUTAS
var fruta_router =require('./routes/frutas');

//body-parser 
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json()); //TOMA LA URL DE LA BASE DE DATOS Y LA VA A TRANSFORMAR EN .JSON

//configurar CORS

//rutas
app.use('/api',fruta_router);




module.exports= app; //por medio del modulo se importa y se le asigna todo lo que le hemos importado a app