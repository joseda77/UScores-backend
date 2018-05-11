//variable que almacena las funcionalidades de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var puntajeEquipo1 = [];
var puntajeEquipo2 = [];


/** Este modelo maneja el tipo de encuentros que es con tiempos 
 * y en el que solo participan dos equipos */
var encuentroSchema = new Schema({
    'consecutivo':{
        type: String,
        required: true
    },
    'fase':{
        type: Number,
        required: true
    },
    'equipo1': {
        type: String,
        required: true
    },
    'equipo2':{
        type: String,
        required: true
    },
    'puntajeEquipo1':{
        type: puntajeEquipo1
    },
    'puntajeEquipo2':{
        type: puntajeEquipo2
    },
    'estado': {
        type: Number,
        default: 0
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('encuentrosTipo1',encuentroSchema);