const torneosModel = require('../models/torneoModels');

let idTorneo = null;

/* Obtiene la lista de los torneos  */
var getListTorneos = function(req, res, next){
    torneosModel.find(function(err,torneosMod){
        if (err){
            return next(err);
        }else{
            res.json(torneosMod);
        }
    });
};

/* Obtiene un solo torneo de acuerdo a su codigo */
var getTorneo = function(req, res, next){
    idTorneo = req.params.codigoTorneo;
    torneosModel.findOne({codigoTorneo: idTorneo}, function(err, torneosMod){
        if (err) {
            return next(err);
        } else {
            res.json(torneosMod);
        }
    });
};

/* Crea todos los torneos  */
var createTorneo = function(req, res, next){
    var torneosMod =new torneosModel({
        codigoTorneo: req.body.codigoTorneo,
        nombreTorneo: req.body.nombreTorneo,
        tipoTorneo: req.body.tipoTorneo,
        participantes: [] //Cambiar esto por null en caso de que no funcione
    });

    torneosMod.save(function(err){
        if (err) {
            return next(err);
        } else {
            console.log("Torneo guardado satisfactoriamente");//-------------------------
        }
    });

    res.send(torneosMod);
};

/* Actualiza los datos de un torneo */
var updateTorneo = function(req, res, next){
    idTorneo = req.body.codigoTorneo;
    torneosModel.findOne({ codigoTorneo: idTorneo},function(err, torneosMod){
        torneosMod.nombreTorneo = req.body.nombreTorneo;
        torneosMod.tipoTorneo = req.body.tipoTorneo;
        torneosMod.participantes = req.body.participantes;
        torneosMod.save(function(err){
            if (err) {
                console.log("ERROR AL ACTUALIZAR EL TORNEO",err);//------------------------------------------
                return next(err);
            } else {
                res.json(torneosMod);
                console.log("TORNEO ACTUALIZADO CORRECTAMENTE");//---------------------------------
            }
        });
    });
};

/* Borra un torneo de la BD*/
var deleteTorneo = function(req, res, next){
    idTorneo = req.params.codigoTorneo;
    torneosModel.findOne({ codigoTorneo: idTorneo}, function(err, torneosMod){
        torneosMod.remove(function(err){
            if (err) {
                 return next(err);
            } else {
                res.json(torneosMod);
                console.log("TORNEO BORRADO CORRECTAMENTE"); //------------------------------------------
            }
        });
    });
};

module.exports = {
    getListTorneos,
    getTorneo,
    createTorneo,
    updateTorneo,
    deleteTorneo
};