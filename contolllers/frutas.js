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