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
    'adminTorneo':{//---------------------- Se le agrega para conocer su creador ---------------
      type: String,
      required: true
    },
    'numeroFases':{ //---------------------- Tambien se agrega para realizar validaciones ---------------
      type: Number,
      required: true
    },
    'tipoTorneo': {
      type: Number,
      required: true
    },
    'listaEquipos': {
      type: arrEquipos
    },
    'listaFases':{ /**Cmabie lista partido por lista fase */
      type: arrPartidos
    },
    'estado':{
      type: Number,
      default: 0
    }
  }
  ,
  { // Revisar para que sirve la versionKey exactamente en mongo
    versionKey: false
  });

  module.exports = mongoose.model('torneos',torneoSchema);