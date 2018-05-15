const encuentrosModel = require("../models/encuentrosTipo2Models");
let idEncuentro = null;

var getListEncuentros = function(req, res) {
  encuentrosModel.find(function(err, encuentrosMod) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      return res.status(200).json(encuentrosMod);
    }
  });
};

var getEncuentro = function(req, res) {
  idEncuentro = req.params.id;
  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      return res.status(201).json(encuentrosMod);
    }
  });
};

var createEncuentro = function(req, res) {
  var encuentrosMod = new encuentrosModel({
    consecutivo: req.body.consecutivo,
    fase: req.body.fase,
    equipos: req.body.equipos,
    puntaje: req.body.puntaje
  });

  encuentrosMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errMsg: err });
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
      encuentrosMod.equipos = req.body.equipos;
      encuentrosMod.puntaje = req.body.puntaje;
      encuentrosMod.estado = req.body.estado;
      encuentrosMod.save(function(err) {
        if (err) {
          return res.status(500).json({ errMsg: err });
        } else {
          return res.status(201).json(encuentrosMod);
        }
      });
    } else {
      return res.status(500).json({ errMsg: "Error al actualizar torneo " + err });
    }
  });
};

var deleteEncuentro = function (req, res){
    idEncuentro = req.params.id;
    encuentrosModel.findById(idEncuentro,function (err, encuentrosMod) {
        if (encuentrosMod != null) {
            encuentrosMod.remove(function(err){
                if(err){
                    return res.status(500).json({ errMsg: err });
                }else{
                    return res.status(201).json({ InfoMsg: "¡Encuentro borrado correctamente!"});
                }
            });
        }else{
            return res.status(500).json({ errMsg: err });
        }
    });
}
module.exports = {
  getListEncuentros,
  getEncuentro,
  createEncuentro,
  updateEncuentro,
  deleteEncuentro
};
