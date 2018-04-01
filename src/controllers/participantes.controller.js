const participantesModel = require('../models/participanteModels.js');
let idParticipante= null;

// Recupera todos los documentos en la BD
var getListParticipantes = function(req, res, next){
    participantesModel.find(function(err, participantesMod){
        if (err){
            return next(err);
        }else{
            res.json(participantesMod)
        }
    })
}

//Recupera un dato pedido de la coleccion que se trae de la BD
var getParticipante = function (req,res, next){
    idParticipante = req.params.identificacion; //Parametros que hay que definir en las rutas tambien
    participantesModel.findOne({identificacion: idParticipante},function(err,participantesMod){
        if(err){
            return next(err);
        }else{
            res.json(participantesMod);
        }
    })
}

//Método de crear un participante en la BD
//Nota: cambiar la palabra crear por agregar
var createParticipantes = function(req, res, next){
    var participantesMod = new participantesModel({
        identificacion: req.body.identificacion, 
        nombreParticipante: req.body.nombreParticipante
    });
    participantesMod.save(function(err){
        if(err){
            return next(err)
        }else{
            console.log("Participante guardado satisfactoriamente");//-------------------------
        }
    });

    res.send(participantesMod);
}

/* Actualiza los datos de un participante */
var updateParticipante = function(req, res, next){
    idParticipante = req.params.identificacion;
    participantesModel.findOne({ identificacion: idParticipante}, function(err, participantesMod){
        participantesMod.identificacion = req.body.identificacion;
        participantesMod.nombreParticipante = req.body.nombreParticipante;
        participantesMod.save(function(err){
            if (err){
                console.log("EL ERROR DE ACTUALIZAR PARTICIPANTE ",err);//--------------------------------------
               return next(err); 
            }else{
                res.json(participantesMod);
                console.log("Participante actualizado satisfactoriamente");
            }
        });
    });
};

var deleteParticipante = function(req, res, next){
    idParticipante = req.params.identificacion;
    participantesModel.findOne({ identificacion: idParticipante}, function(err, participantesMod){
        participantesMod.remove(function(err){
            if (err) {
                console.log("ERROR AL BORRAR PARTICIPANTE",err);
                return next(err);
            } else {
                res.json(participantesMod);
                console.log("Participante borrado satisfactoriamente");
            }
        });
    });
};

module.exports = {
    createParticipantes,
    getListParticipantes,
    getParticipante,
    deleteParticipante,
    updateParticipante
}