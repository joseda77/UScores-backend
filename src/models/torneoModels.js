//variable que almacena las funcionalidades de mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

var arrParticipantes = [];

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
    'tipoTorneo': {
      type: Number,
      required: true
    },
    'participantes': {
      type: arrParticipantes,
      required: true
    }
  });

  module.exports = mongoose.model('torneos',torneoSchema);