//variable que almacena las funcionalidades de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var puntajeEquipo1 = [];
var puntajeEquipo2 = [];

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
        type: puntajeEquipo1,
        required: true
    },
    'puntajeEquipo2':{
        type: puntajeEquipo2,
        required: true
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

module.exports = mongoose.model('encuentros',encuentroSchema);