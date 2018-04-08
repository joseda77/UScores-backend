//variable que almacena las funcionalidades de mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

var participanteSchema = new Schema({
    'identificacion': {
      type: String,
      required: true,
      unique: true
    },
    'nombreParticipante': {
      type: String,
      required: true
    },
    'puntosAnotados':{ // Este campo tambien sirve para los tiempos (mirar si es string normal o arreglo)
      type: String
    },
    'penalizaciones':{
      type: String
    }
  },
  { // Revisar para que sirve la versionKey exactamente en mongo
    versionKey: false
  });

  module.exports = mongoose.model('participantes',participanteSchema);