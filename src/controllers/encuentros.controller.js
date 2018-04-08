const encuentrosModel = require("../models/encuentrosModels");
let idEncuentro = null;

var getListEncuentros = function(req, res) {
  encuentrosModel.find(function(err, encuentrosMod) {
    if (err) {
      res.status(500).json({ errmsg: err });
    } else {
      res.json(encuentrosMod);
    }
  });
};

var getEncuentro = function(req, res) {
  idEncuentro = req.params.id;
  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {
    if (err) {
      res.status(500).json({ errmsg: err });
    } else {
      res.json(encuentrosMod);
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
      res.status(500).json({ errmsg: err });
    } else {
      console.log("Encuentro Guardado correctamente");
    }
  });
  res.send(encuentrosMod);
};

var updateEncuentro = function(req, res) {
  console.log("Fuera del modelo ", req.params.id); //////////////////////////////////////////////////////
  idEncuentro = req.params.id;
  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {      
    encuentrosMod.consecutivo = req.body.consecutivo;    
    encuentrosMod.fase = req.body.fase;    
    encuentrosMod.equipo1 = req.body.equipo1;
    encuentrosMod.equipo2 = req.body.equipo2;    
    encuentrosMod.puntajeEquipo1 = req.body.puntajeEquipo1;
    encuentrosMod.puntajeEquipo2 = req.body.puntajeEquipo2;    
    encuentrosMod.save(function(err) {
      if (err) {
        console.log("EL ERROR DE ACTUALIZAR ENCUENTROS ", err); //--------------------------------------
        res.status(500).json({ errmsg: err });
      } else {
        res.json(encuentrosMod);
        console.log("Datos del encuentro actualizados satisfactoriamente"); //-------------------------
      }
    });
  });
};

var deleteEncuentro = function(req, res){
    idEncuentro = req.params.id;
    encuentrosModel.findById(idEncuentro,function(err,encuentrosMod){
        encuentrosMod.remove(function(err){
            if (err) {
                res.status(500).json({ errmsg: err });
            } else {
                res.json(encuentrosMod);
                console.log('Encuentro borrado correctamente');                
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
