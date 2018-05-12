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
      select: false,
      required: true     
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
      return next(err);
    }else{
      bcrypt.hash(usuario.password, salt, function(err,hash){
        if(err){
          return next(err);  
          usuario.password = hash;
          next();
        }
      })
    }
  });
});

usuarioSchema.methods.comparePassword = function(password, cb) {  
  bcrypt.compare(password, this.password, function(err, isMatch) {       
    if (err){       
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('usuarios',usuarioSchema);