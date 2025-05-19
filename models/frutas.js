'use strict'
var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var FrutaSchema= Schema({
    nombre: String,
    color: String,
    temporada: String
});

module.exports= mongoose.model('fruta',FrutaSchema);
