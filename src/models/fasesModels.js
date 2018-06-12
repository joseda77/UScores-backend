const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var listaPartido = [];

var faseSchema = new Schema({
    'torneo':{
        type:String,
        required:true
    },
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
    'listaPartidos':{
        type: listaPartido
    },
    'estado': {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('fases', faseSchema);