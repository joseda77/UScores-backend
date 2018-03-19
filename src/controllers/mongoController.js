const usuario = require('../models/usuarioModels');
const torneos = require('../models/torneoModels');
const participantes = require('../models/participanteModels');
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

var getParticipantes = function getParticipante(res, req){
    let identificacion = req.params.identificacion;
    participantes.findId(identificacion,(err,participantes)=>{
        if (err) return res.status(500).send({ message: `Archivo no encontrado ${err}` });
        if (!identificacion) return res.status(404).send({ message:`El participante no existe` });
        res.status(200).send({ identificacion });
    });
};

var getParticipantes2 = function getParticipantes3(req, res) {
    // con el {} trae todas las palabras
    participantes.find({}, (err, participantes) => {
        if (err) return res.status(500).send({ message: `Error al buscar ${err}` });
        if (!participantes) return res.status(404).send({ message: `No hay palabras` });
        res.status(200).send({ participantes: participantes });
    });
}


module.exports = {
    getParticipantes2, getParticipantes
}