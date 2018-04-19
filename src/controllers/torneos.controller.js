const torneosModel = require("../models/torneoModels");

let idTorneo = null;

/* Obtiene la lista de los torneos  */
var getListTorneos = function(req, res, next) {
  torneosModel.find(function(err, torneosMod) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(200).json(torneosMod);
    }
  });
};

/* Obtiene un solo torneo de acuerdo a su codigo */
var getTorneo = function(req, res, next) {
  idTorneo = req.params.codigoTorneo;
  torneosModel.findOne({ codigoTorneo: idTorneo }, function(err, torneosMod) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(200).json(torneosMod);
    }
  });
};

/* Crea todos los torneos  */
var createTorneo = function(req, res, next) {
  var torneosMod = new torneosModel({
    codigoTorneo: req.body.codigoTorneo,
    nombreTorneo: req.body.nombreTorneo,
    deporte: req.body.deporte,
    tipoTorneo: req.body.tipoTorneo,
    listaEquipos: req.body.listaEquipos, //Cambiar esto por null en caso de que no funcione
    listaPartidos: req.body.listaPartidos //Cambiar esto por null en caso de que no funcione
  });

  torneosMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(201).json(torneosMod);
      console.log("Torneo guardado satisfactoriamente"); //-------------------------
    }
  });
};

/* Actualiza los datos de un torneo */
var updateTorneo = function(req, res, next) {
  idTorneo = req.body.codigoTorneo;
  torneosModel.findOne({ codigoTorneo: idTorneo }, function(err, torneosMod) {
    if (torneosMod != null) {
      torneosMod.nombreTorneo = req.body.nombreTorneo;
      torneosMod.deporte = req.body.deporte;
      torneosMod.tipoTorneo = req.body.tipoTorneo;
      torneosMod.listaEquipos = req.body.listaEquipos; //Cambiar esto por null en caso de que no funcione
      torneosMod.listaPartidos = req.body.listaPartidos; //Cambiar esto por null en caso de que no funcione
      torneosMod.save(function(err) {
        if (err) {
          return res.status(500).json({ errmsg: err });
        } else {
          return res.status(200).json(torneosMod);
        }
      });
    } else {
      return res.status(500).json({ errMsg: err });
    }
  });
};

/* Borra un torneo de la BD*/
var deleteTorneo = function(req, res, next) {
  idTorneo = req.params.codigoTorneo;
  torneosModel.findOne({ codigoTorneo: idTorneo }, function(err, torneosMod) {
    torneosMod.remove(function(err) {
      if (err) {
        return res.status(500).json({ errmsg: err });
      } else {
        return res.status(200).json(torneosMod);
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
