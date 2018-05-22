const faseModel = require('../models/fasesModels');


var getFases = function (req, res) {
    faseModel.find(function (err, faseMod) {
        if (err) {
            return res.status(500).json({ errMsg: err });
        } else {
            return res.status(201).json(faseMod);
        }
    });
}

var getFase = function (req, res) {
    faseModel.findById(req.params.id,function (err, faseMod) {
        if (error) {
            return res.status(500).json({ errMsg: err });
        } else {
            return res.status(201).json(faseMod);
        }
    });
}


/**va en crear fase, recordar colocar este metodo asincrono,ademas de arreglar el error del schema de fase*/
var createFase = async function (encuentros, equipos, clasificados, fase) {
    console.log(encuentros,equipos,clasificados,fase);
    faseMod = new faseModel({
        numeroEncuentros: encuentros,
        numeroEquipos: equipos,
        numeroDeClasificados: clasificados,
        numeroFase: fase
    });

    faseMod.save(function (err) {
        console.log("Entra al save"+err);
        if (err) {
            return err;
        } else {
            console.log("Entra al guardar");
            return faseMod;
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
    getFase,
    getFases
}