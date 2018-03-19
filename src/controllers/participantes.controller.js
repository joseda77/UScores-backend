const participantesModel = require('../models/participanteModels.js');

//Método de crear un participante en la BD
//Nota: cambiar la palabra crear por agregar
var crearParticipantes = function(req, res, next){
    var participantesModel = new participantes(req.body);

    participantesModel.save(function(err,){
        if (err){
            return next(err);
        }else{
            res.json(participantesModel);
        }
    });
}

// Recupera todos los documentos en la BD
var getListParticipantes = function(req, res, next){
    participantesModel.find({},function(err, participantesModel){
        if (err){
            return next(err);
        }else{
            res.json(participantesModel)
        }
    })
}

module.exports = {
    crearParticipantes,
    getListParticipantes
}