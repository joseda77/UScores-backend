//variable que almacena las funcionalidades de mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

var participanteSchema = new Schema({
    'identificacion': {
      type: String,
      required: true
    },
    'nombreParticipante': String
  },
  { // Revisar para que sirve la versionKey exactamente en mongo
    versionKey: false
  });

  module.exports = mongoose.model('participantes',participanteSchema);