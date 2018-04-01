//variable que almacena las funcionalidades de mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

var torneosCreados = [];
var torneosFavoritos = [];

var usuarioSchema = new Schema({
    'nombreUsuario': { 
      type: String,
      required: true,
      unique: true
    },
    'email': {
      type: String,
      required: true,
      unique: true
    },
    'password': {
      type:String,
      required: true
    },
    'torneosCreados': torneosCreados,
    'torneosFavoritos': torneosFavoritos
  },
  { // Revisar para que sirve la versionKey exactamente en mongo
    versionKey: false
  });

  module.exports = mongoose.model('usuarios',usuarioSchema);