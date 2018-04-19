//variable que almacena las funcionalidades de mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var torneosCreados = [];
var torneosFavoritos = [];

var usuarioSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      select: false
    },
    fechaRegistro: { // Esto podria salir en caso de que no se necesite.
      type: Date,
      default: Date.now()
    },
    torneosCreados: torneosCreados,
    torneosFavoritos: torneosFavoritos
  },
  {
    // Revisar para que sirve la versionKey exactamente en mongo
    versionKey: false
  }
);

usuarioSchema.pre('save', function(next){  
  let usuario = this;
  if(!usuario.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt){
    if(err){
      return next();
    }else{
      bcrypt.hash(usuario.password, salt, null, function(err,hash){
        if(err){
          return next();
        }else{
          usuario.password = hash;
          next();
        }
      })
    }
  });
});

  module.exports = mongoose.model('usuarios',usuarioSchema);