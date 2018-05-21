const faseModel = require('../models/fasesModels');


var getFase = function (req, res) {
    faseModel.findById(req.params.id,function (err, faseMod) {
        if (error) {
            return res.status(500).json({ errMsg: err });
        } else {
            return res.status(201).json(faseMod);
        }
    });
}

var createFase = function (req, res) {
    faseMod = new faseModel({
        numeroEncuentros: req.body.numeroEncuentros,
        numeroEquipos: req.body.numeroEquipos,
        numeroDeClasificados: req.body.numeroDeClasificados,
        numeroFase: req.body.numeroFase
    });

    faseMod.save(function (err) {
        if(err){
            return res.status(500).json({ errMsg: err })
        }else{
            return res.status(500).json(faseMod);
        }
    });
}

var updateFase = function (req, res) {
    faseModel.findById(req.params.id, function (err, faseMod) {
        faseMod.numeroEncuentros=  req.body.numeroDeEncuentros;
        faseMod.numeroEquipos = req.body.numeroEquipos;
        faseMod.numeroDeClasificados = req.body.numeroDeClasificados;
        faseMod.numeroFase = req.body.numeroFase;
        faseMod.estado = req.body.estado;

        faseMod.save(function (err){
            if(err){
                return res.status(500).json({ errMsg: err});
            }else {
                return res.status(201).json(faseMod);
            }
        });
    });
}

var deleteFase = function (req, res) {
    faseModel.findById(req.body.id, function (err, faseMod) {
        if(err){
            return res.status(500).json({ errMsg: err});            
        }else {
            return res.status(500).json(faseMod);            
        }     
    });
}

module.exports = {
    deleteFase,
    createFase,
    updateFase,
    getFase
}