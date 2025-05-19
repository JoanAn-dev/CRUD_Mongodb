app.js
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

index.js
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



module.exports= app; //por medio del modulo se importa y se le asigna todo lo que le hemos importado a app



package.json 
    {
  "name": "proyecto-mongo-backend",
  "version": "1.0.0",
  "description": "Proyecto con mongoDB",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"   
    
  },
  "author": "Joan Garcia Diaz",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.3",
    "express": "^4.21.2",
    "mongoose": "^8.12.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}


CONTOLLLERS
  frutas.js
    'use strict' //ESTA LINEA LO QUE HACE ES QUE NOS VALIDA TODAS LAS VARIABLES QUE PODAMOS TENER

const frutas = require('../models/frutas');
//ESTA CLASE DE JS LO QUE HACE PUES ES HACER LA CONEXION ENTRE NUESTRO PROYECTO, NUESTRA BASE DE DATOS  

var Fruta = require('../models/frutas');

function pruebas(req,res) {//ESTE APARTADO LO QUE HACE ES QUE HACE UNA 'CONEXION'
    res.status(200).send({
        messanger: 'Esta ruta es de prueba en mi API RESFUL con MONGO y NODE.js'
    })
};

/*function saveFruta(req, res){
    var fruta = new Fruta();
    var params = req.body;
    if(params.nombre){
        fruta.nombre = params.nombre;
        fruta.color = params.color;
        fruta.temporada = params.temporada;
        fruta.save((err, frutaStored) => {
            if(err){
                res.status(500).send({
                    message: 'Error en el servidor'
                });
            }else{
                if(frutaStored){
                    res.status(200).send({
                        fruta: frutaStored
                    });
                }else{
                    res.status(200).send({
                        message: 'No se ha guardado la fruta'
                    });
                }
            }
        });
 
    }else{
        res.status(200).send({
            message:'El nombre de la fruta es obligatorio'
        });
    }
}*/




async function saveFruta(req,res) {
    try{
        var params = req.body;

        if(!params.nombre) {
            return res.status(400).send({message: 'El nombre de la fruta es obligatorio'});
        }

        const fruta = new Fruta({
            nombre: params.nombre,
            color: params.color,
            temporada: params.temporada
        });

        const frutaStored = await fruta.save();
        res.status(201).send({fruta: frutaStored});
    }catch(err){
        res.status(500).send({message: 'Error en el servidor', error: err.message});
        }
    }
    

/*function getFrutas(req,res){
    Fruta.find({}).exec((err,frutas) =>{
        if(err){
            res.status(500).send({
                message: 'Error en el servidor'
            });
        }else{
            if(frutas){
                res.status(200).send({
                    frutas
                });
            }else{
                res.status(404).send({
                    message: 'No hay Frutas'
                });
            }
        }

    });
    
}*/


async function getFrutas(req, res) {
    try {
        const frutasList = await frutas.find({});
        if (frutasList.length > 0) {
            res.status(200).send({ frutas: frutasList });
        } else {
            res.status(404).send({ message: 'No hay Frutas' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error en el servidor', error: error.message });
    }
}

async function getFrutaId(req,res) {
    const FrutaId = req.params.id;
    try{
        const fruta = await frutas.findById(FrutaId);
        if(!fruta){
            res.status(404).send({message:'Fruta no encontrada'});
        }else{
          res.status(200).send({fruta});
        }
        
    }catch(err){
        res.status(500).send({message: 'Error en el servidor'})
    }
}

/* async function updateFruta(req,res) {
    const FrutaId=req.params.id;
    const update=req.body//MUESTERA TODO EL ESQUEMA DE LA COLECCION VAMOS A BUSCAR Y ACTUALIZAS

    Fruta.findByIdAndUpdate(FrutarutaId, update){
        true
    },(err, frutaUpdated) =>{

        if(err){
            res.status(500).send({message:'Error al actualizar la fruta'})
    }
    if(!frutaUpdated){
        send.status(404).send({message: 'Fruta no encontrada o no se pudo actualizar'})
    }
    res.status(200).send({fruta: frutaUpdated});
    
}*/

async function updateFruta(req, res) {
    const frutaId = req.params.id; 
    const update = req.body; 

    try {
        const frutaUpdated = await Fruta.findByIdAndUpdate(frutaId, update, { new: true });

        if (!frutaUpdated) {
            return res.status(404).send({ message: 'Fruta no encontrada o no se pudo actualizar' });
        }

        res.status(200).send({ fruta: frutaUpdated });

    } catch (err) {
        res.status(500).send({ message: 'Error al actualizar la fruta', error: err.message });
    }
}


module.exports={//AQUI LO QUE HACEMOS ES UN TIPO METODO O FUNCION DONDE EXPORTAMOS LA FUNCION DE ARRIBA QUE HACE LA CONEXION
    pruebas,
    saveFruta,
    getFrutas,
    getFrutaId,
    updateFruta
};



MODELS
  frutas.js
      'use strict'
var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var FrutaSchema= Schema({
    nombre: String,
    color: String,
    temporada: String
});

module.exports= mongoose.model('fruta',FrutaSchema);



ROUTES
  frutas.js
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

