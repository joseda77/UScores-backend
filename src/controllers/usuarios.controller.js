const usuariosModel = require('../models/usuarioModels');

let nombreUser = null;

/* Obtiene la lista de usuarios */
var getListUsuarios = function(req, res , next){
    usuariosModel.find(function(err, usuariosMod){
        if(err){
            return next(err);
        }else{
            res.json(usuariosMod);
        }
    });
};

/* Obtiene un usuario en especifico por su nombre de usuario */
var getUsuario = function(req, res, next){
    nombreUser = req.params.nombreUsuario;
    usuariosModel.findOne({ nombreUsuario: nombreUser },function(err, usuariosMod){
        if (err) {
            return next(err);
        } else {
            res.json(usuariosMod);
        }
    });
}

/* Crea el usuario */
var createUsuarios = function(req, res){
    var usuariosMod = new usuariosModel({
        nombreUsuario: req.params.nombreUsuario,
        email: req.params.email,
        password: req.params.password,
        torneosCreados: [],
        torneosFavoritos: []//Cambiar esto por null en caso de que no funcione
    }) ;

    usuariosMod.save(function(err,next) {
      if (err) {
        return next(err);
      } else {
        console.log("Usuario guardado satisfactoriamente"); //-------------------------
      }
    });

    res.send(usuariosMod);
};

/* Actualiza los datos del usuario*/
var updateUsuario = function(req, res, next){
    nombreUser = req.params.nombreUsuario;
    usuariosModel.findOne({ nombreUsuario: nombreUser },function(err, usuariosMod){
        usuariosMod.email = req.params.email;
        usuariosMod.password = req.params.password;

        //Revisar si esta linea puede ir por fuera del findOne --------------------------------
        usuariosMod.save(function(err, next) {
          if (err) {
              console.log("EL ERROR DE ACTUALIZAR USUARIOS ",err);//--------------------------------------
            return next(err);
          } else {
            console.log("Datos del usuario actualizados satisfactoriamente"); //-------------------------
          }
        });
   });    
};

/* Borra los datos de un usuario*/
var deleteUsuario = function(req, res ,next){
    nombreUser = req.params.nombreUsuario;
    usuariosModel.findOne({ nombreUsuario: nombreUser },function(err, usuariosMod){
        usuariosMod.remove(function(err){
            if(err){
                return next(err);
            }else{
                console.log("Usuario Borrados satisfactoriamente");//-----------------------------------
            }
        });
    });
};

module.exports = {
    getListUsuarios,
    createUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario
}