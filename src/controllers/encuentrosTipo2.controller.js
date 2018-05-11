const encuentrosModel = require('../models/encuentrosTipo2Models');
let idEncuentro = null;

var getEncuentros = function (req, res) {
    encuentrosModel.find(function(err, encuentrosMod){
        if(err){
            return res.status(500).json({ errMsg: err});
        }else{
            return res.status(200).json(encuentrosMod);
        }
    });
}

var createEncuentro = function(req, res){
    var encuentrosMod = new encuentrosModel({
        consecutivo: req.body.consecutivo,
        fase:  req.body.fase,
        equipos: [],
        puntaje: []
    });

    encuentrosMod.save(function(err, ){
        if (err){
            return res.status(500).json({ errMsg: err});
        }else{
            return res.status(201).json(encuentrosMod);
        }
    });
}

module.exports = {
    getEncuentros,
    createEncuentro
};