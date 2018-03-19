//variable que almacena las funcionalidades de mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

var participanteSchema = new Schema({
    'identificacion': {
      type: String,
      required: true
    },
    'nombreParticipante': String
  });

  module.exports = mongoose.model('participantes',participanteSchema);