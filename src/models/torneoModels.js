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
      type: String,///Mirar bien si se deja con number o no-------------
      required: true
    },
    'participantes': {
      type: arrParticipantes,
      required: true
    }
  }
  ,
  { // Revisar para que sirve la versionKey exactamente en mongo
    versionKey: false
  });

  module.exports = mongoose.model('torneos',torneoSchema);