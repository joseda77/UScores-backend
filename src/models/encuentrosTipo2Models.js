const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var equipos = [];
var puntajes = [];

/** Este modelo maneja el tipo de encuentros que es con tiempos 
 * y en el que participan mas de dos equipos en un mismo encuetro */
var encuentroSchema = new Schema({
    'consecutivo':{
        type: String,
        required: true
    },
    'fase':{
        type: Number,
        required: true
    },
    'equipos':{
        type: equipos
    },
    'puntajes':{
        type: puntajes
    },
    'estado': {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('encuentrosTipo2',encuentroSchema);