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
        codigoTorneo: req.params.codigoTorneo,
        nombreTorneo: req.params.nombreTorneo,
        tipoTorneo: req.params.tipoTorneo,
        participantes: req.params.participantes
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
    idTorneo = req.params.codigoTorneo;
    torneosModel.findOne({ codigoTorneo: idTorneo},function(err, torneosMod){
        torneosMod.nombreTorneo = req.params.nombreTorneo;
        torneosMod.tipoTorneo = req.params.tipoTorneo;
        torneosMod.participantes = req.params.participantes;

        //Mirar si esta linea va por fuera del findOne---------------------------------------
        torneosMod.save(function(err){
            if (err) {
                console.log("ERROR AL ACTUALIZAR EL TORNEO",err);//------------------------------------------
                return next(err);
            } else {
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
                console.log("ERROR AL BORRAR EL TORNEO", err); //------------------------------------------
                return next(err);
            } else {
                console.log("TORNEO BORRADO CORRECTAMENTE"); //------------------------------------------
            }
        })
    });
};

module.exports = {
    getListTorneos,
    getTorneo,
    createTorneo,
    updateTorneo,
    deleteTorneo
};