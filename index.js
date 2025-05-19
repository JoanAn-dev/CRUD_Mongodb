'use strict'
var mongoose = require('mongoose'); //LE ASIGNAMOS A LA VARIABLE MONGOOSE TODA LA LIBRERIA DE MONGOOSE
var app = require('./app'); //AQUI KO QUE HACEMOS ES A;ADIR LA VARIABLE APP
var port= 3800; 
mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mongo', //aqui hacemos la conexion con la base de datos
    {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(() => {
        console.log('La conexion a la base de datos es correcta ');
        app.listen(port,() => {
            console.log('El servidor esta corriendo en puerto localhost ' +  port);
        });
    })
        .catch(err =>{
            console.log(err)
        });