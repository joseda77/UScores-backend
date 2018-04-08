const equiposModel = require('../models/equipoModels');

let codigoEq = null;

/* Obtiene la lista de equipos */
var getListEquipos = function(req, res, next) {
  equiposModel.find(function(err, equiposMod) {
    if (err) {
      res.status(500).json({ errmsg: err });
    } else {
      res.json(equiposMod);
    }
  });
};

/* Obtiene un equipo en especifico por su nombre y su torneo*/
var getEquipo = function(req, res, next) {
    codigoEq = req.params.codigoEquipo;
    equiposModel.findOne({ codigoEquipo: codigoEq }, function(err, equiposMod) {
      if (err) {
        res.status(500).json({ errmsg: err });
      } else {
        res.json(equiposMod);
      }
    });
}

/* Crea un equipo */
var createEquipo = function(req, res){
    var equiposMod = new equiposModel({
        codigoEquipo: req.body.codigoEquipo,
        nombreEquipo: req.body.nombreEquipo,
        fase: 1,
        listaParticipantes: req.body.listaParticipantes,
        puntaje: ''
    });

    equiposMod.save(function(err){
        if (err) {
          res.status(500).json({ errmsg: err });
        } else {
          console.log("Equipo guardado satisfactoriamente"); //--------------------------------------------
        }
    });
    res.send(equiposMod);
}

var updateEquipo = function(req, res){
    codigoEq = req.params.codigoEquipo;
    equiposModel.findOne({ codigoEquipo: codigoEq},function(err, equiposMod){
        equiposMod.nombreEquipo = req.body.codigoEquipo;
        equiposMod.fase = req.body.fase;
        equiposMod.listaParticipantes = []; // Cambiar por lo que se reciba
        equiposMod.puntaje = req.body.puntaje;
        equiposMod.save(function(err){
          if (err) {
            console.log("EL ERROR DE ACTUALIZAR USUARIOS ",err);//--------------------------------------
            res.status(500).json({errmsg: err});
          } else {
            res.json(equiposMod);
            console.log('Datos de equipo actualizados correctamente');
          }
        });
    });
}

var deleteEquipo = function(req, res){
  codigoEq = req.params.codigoEquipo;
  equiposModel.findOne({codigoEquipo: codigoEq},function(err, equiposMod){
    equiposMod.remove(function(err){
      if (err) {
        res.status(500).json({ errmsg: err });
      } else {
        res.json(equiposMod);
        console.log("Equipo Borrados satisfactoriamente"); //-----------------------------------
      }
    });
  });
}

module.exports = {
    getEquipo,
    getListEquipos,
    createEquipo,
    updateEquipo,
    deleteEquipo
}

