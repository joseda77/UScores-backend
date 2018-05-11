const encuentrosModel = require("../models/encuentrosTipo1Models");
const torneoController = require('./torneos.controller');
const websocketService = require('../service/websocket.service');
let idEncuentro = null;


var getListEncuentros = function(req, res) {
  encuentrosModel.find(function(err, encuentrosMod) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(200).json(encuentrosMod);
    }
  });
};

var getEncuentro = function(req, res) {
  idEncuentro = req.params.id;
  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(200).json(encuentrosMod);
    }
  });
};

var createEncuentro = function(req, res) {
  var encuentrosMod = new encuentrosModel({
    consecutivo: req.body.consecutivo,
    fase: req.body.fase,
    equipo1: req.body.equipo1,
    equipo2: req.body.equipo2,
    puntajeEquipo1: req.body.puntajeEquipo1,
    puntajeEquipo2: req.body.puntajeEquipo2
  });

  encuentrosMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(201).json(encuentrosMod);
    }
  });
};

var updateEncuentro = function(req, res) {
  idEncuentro = req.params.id;
  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {
    if (encuentrosMod != null) {
      encuentrosMod.consecutivo = req.body.consecutivo;
      encuentrosMod.fase = req.body.fase;
      encuentrosMod.equipo1 = req.body.equipo1;
      encuentrosMod.equipo2 = req.body.equipo2;
      encuentrosMod.puntajeEquipo1 = req.body.puntajeEquipo1;
      encuentrosMod.puntajeEquipo2 = req.body.puntajeEquipo2;
      encuentrosMod.estado = req.body.estado;
      encuentrosMod.save(function(err) {
        if (err) {
          return res.status(500).json({ errmsg: err });
        } else {
          return res.status(200).json(encuentrosMod);
        }
      });
    } else {
      return res.status(500).json({ errMsg: err });
    }
  });
};

var deleteEncuentro = function(req, res) {
  idEncuentro = req.params.id;
  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {
    encuentrosMod.remove(function(err) {
      if (err) {
        return res.status(500).json({ errmsg: err });
      } else {
        return res.status(200).json(encuentrosMod);
        console.log("Encuentro borrado correctamente");/////////---------------------------------------
      }
    });
  });
};

module.exports = {
  getEncuentro,
  getListEncuentros,
  createEncuentro,
  updateEncuentro,
  deleteEncuentro
};
