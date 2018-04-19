const equiposModel = require("../models/equipoModels");

let codigoEq = null;

/* Obtiene la lista de equipos */
var getListEquipos = function(req, res, next) {
  equiposModel.find(function(err, equiposMod) {
    if (err) {
      return res.status(404).json({ errmsg: err });
    } else {
      return res.status(200).json(equiposMod);
    }
  });
};

/* Obtiene un equipo en especifico por su nombre y su torneo*/
var getEquipo = function(req, res, next) {
  codigoEq = req.params.codigoEquipo;
  equiposModel.findOne({ codigoEquipo: codigoEq }, function(err, equiposMod) {
    if (err) {
      return res.status(404).json({ errmsg: err });
    } else {
      return res.status(200).json(equiposMod);
    }
  });
};

/* Crea un equipo */
var createEquipo = function(req, res) {
  var equiposMod = new equiposModel({
    codigoEquipo: req.body.codigoEquipo,
    nombreEquipo: req.body.nombreEquipo,
    fase: 1,
    listaParticipantes: req.body.listaParticipantes,
    puntaje: ""
  });

  equiposMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(201).json(equiposMod);
      console.log("Equipo guardado satisfactoriamente"); //--------------------------------------------
    }
  });
};

var updateEquipo = function(req, res) {
  codigoEq = req.params.codigoEquipo;
  equiposModel.findOne({ codigoEquipo: codigoEq }, function(err, equiposMod) {
    if (equiposMod != null) {
      equiposMod.nombreEquipo = req.body.codigoEquipo;
      equiposMod.fase = req.body.fase;
      equiposMod.listaParticipantes = []; // Cambiar por lo que se reciba
      equiposMod.puntaje = req.body.puntaje;
      equiposMod.save(function(err) {
        if (err) {
          console.log("EL ERROR DE ACTUALIZAR USUARIOS ", err); //--------------------------------------
          return res.status(500).json({ errmsg: err });
        } else {
          return res.status(200).json(equiposMod);
          console.log("Datos de equipo actualizados correctamente");////---------------------------------------
        }
      });
    } else {
      return res.status(500).json({ errMsg: err });
    }
  });
};

var deleteEquipo = function(req, res) {
  codigoEq = req.params.codigoEquipo;
  equiposModel.findOne({ codigoEquipo: codigoEq }, function(err, equiposMod) {
    equiposMod.remove(function(err) {
      if (err) {
        return res.status(500).json({ errmsg: err });
      } else {
        return res.status(200).json(equiposMod);
        console.log("Equipo Borrados satisfactoriamente"); //-----------------------------------
      }
    });
  });
};

module.exports = {
  getEquipo,
  getListEquipos,
  createEquipo,
  updateEquipo,
  deleteEquipo
};
