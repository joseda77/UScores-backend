const participantesModel = require("../models/participanteModels.js");
const usuarioController = require("./usuarios.controller");
let idParticipante = null;
let bandera = null;

// Recupera todos los documentos en la BD
var getListParticipantes = function(req, res, next) {
  participantesModel.find(function(err, participantesMod) {
    if (err) {
       return res.status(404).json({ errMsg: err });
    } else {
       return res.status(200).json(participantesMod);
    }
  });
};

//Recupera un dato pedido de la coleccion que se trae de la BD
var getParticipante = function(req, res, next) {
  idParticipante = req.params.identificacion; //Parametros que hay que definir en las rutas tambien
  participantesModel.findOne({ identificacion: idParticipante }, function(
    err,
    participantesMod
  ) {
    if (err) {
      return res.status(404).json({ errMsg: err });
    } else {
      return res.status(200).json(participantesMod);
    }
  });
};

//Método de crear un participante en la BD
//Nota: cambiar la palabra crear por agregar
var createParticipantes = function(req, res, next) {
  var participantesMod = new participantesModel({
    identificacion: req.body.identificacion,
    nombreParticipante: req.body.nombreParticipante,
    puntosAnotados: null, // En caso de que null no funcione, dejar el campo vacio o no llevarle nada
    penalizaciones: null // En caso de que null no funcione, dejar el campo vacio o no llevarle nada
  });
  participantesMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      return res.status(201).json(participantesMod);
    }
  });
};

/* Actualiza los datos de un participante */
var updateParticipante = function(req, res, next) {
  idParticipante = req.body.identificacion;
  participantesModel.findOne({ identificacion: idParticipante }, function(err , participantesMod) {
    if(participantesMod != null)  {
        participantesMod.identificacion = req.body.identificacion;
        participantesMod.nombreParticipante = req.body.nombreParticipante;
        participantesMod.puntosAnotados = req.body.puntosAnotados;
        participantesMod.penalizaciones = req.body.penalizaciones;
        participantesMod.save(function(err) {
        if (err) {
             return res.status(500).json({ errMsg: err });
        } else {
            return res.status(200).json(participantesMod);
        }
        });
    }else{
        return res.status(500).json({ errMsg: err});
    }
  });
};

var deleteParticipante = function(req, res, next) {
  idParticipante = req.params.identificacion;
  participantesModel.findOne({ identificacion: idParticipante }, function(err,participantesMod) {
    participantesMod.remove(function(err) {
      if (err) {
        return res.status(500).json({ errMsg: err });
      } else {
        return res.status(200).json(participantesMod);
      }
    });
  });
};


/*var setBandera = async function(){
  bandera = usuarioController.perteneceTorneo();
}*/

module.exports = {
  createParticipantes,
  getListParticipantes,
  getParticipante,
  deleteParticipante,
  updateParticipante
};
