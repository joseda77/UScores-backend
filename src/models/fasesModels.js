const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var faseSchema = new Schema({
   /* 'codigoFase':{
        type: String,
        require: true,
        unique: true
    },*/
    'numeroEncuentros':{
        type: Number,
        require: true
    },
    'numeroEquipos':{
        type: Number,
        require: true
    },
    'numeroDeClasificados':{
        type: Number,
        require: true
    },
    'numeroFase':{
        type: Number,
        require: true
    },
    'estado': {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('fases', faseSchema);