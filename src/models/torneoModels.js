//variable que almacena las funcionalidades de mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

var arrEquipos = [];
var arrPartidos = [];

var torneoSchema = new Schema({
    'codigoTorneo': {
      type: String,
      required: true,
      unique: true
    },
    'nombreTorneo': {
      type: String,
      required: true
    },
    'deporte':{
      type: String,
      required: true
    },
    'tipoTorneo': {
      type: Number,
      required: true
    },
    'listaEquipos': {
      type: arrEquipos,
      required: true
    },
    'listaPartidos':{
      type: arrPartidos
    }
  }
  ,
  { // Revisar para que sirve la versionKey exactamente en mongo
    versionKey: false
  });

  module.exports = mongoose.model('torneos',torneoSchema);