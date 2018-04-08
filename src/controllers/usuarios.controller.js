const usuariosModel = require('../models/usuarioModels');

let nombreUser = null;

/* Obtiene la lista de usuarios */
var getListUsuarios = function(req, res , next){
    usuariosModel.find(function(err, usuariosMod){
        if(err){
            res.status(500).json({errmsg: err});
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
            res.status(500).json({errmsg: err});
        } else {
            res.json(usuariosMod);
        }
    });
}

/* Crea el usuario */
var createUsuarios = function(req, res){
    var usuariosMod = new usuariosModel({
        nombreUsuario: req.body.nombreUsuario,
        email: req.body.email,
        password: req.body.password,
        torneosCreados: [], //Cambiar esto por null en caso de que no funcione
        torneosFavoritos: []//Cambiar esto por null en caso de que no funcione
    }) ;

    usuariosMod.save(function(err,next) {
      if (err) {
        res.status(500).json({errmsg: err});
      } else {
        console.log("Usuario guardado satisfactoriamente"); //-------------------------
      }
    });

    res.send(usuariosMod);
};

/* Actualiza los datos del usuario*/ 
var updateUsuario = function(req, res, next){
    nombreUser = req.body.nombreUsuario;
    usuariosModel.findOne({ nombreUsuario: nombreUser },function(err, usuariosMod){ 
        usuariosMod.email = req.body.email;
        usuariosMod.password = req.body.password;
        usuariosMod.save(function(err, next) {            
          if (err) {
              console.log("EL ERROR DE ACTUALIZAR USUARIOS ",err);//--------------------------------------
              res.status(500).json({errmsg: err});
          } else {
              res.json(usuariosMod);
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
                res.status(500).json({ errmsg: err });
            }else{
                res.json(usuariosMod);
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