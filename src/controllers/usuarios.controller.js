const usuariosModel = require("../models/usuarioModels");
const tokenFunctions = require("../service/token.service");

let nombreUser = null;
var user = null;
var contra = null;
var correo = null;
var userToken = null;


/* Obtiene la lista de usuarios */
var getListUsuarios = function(req, res, next) {
  usuariosModel.find(function(err, usuariosMod) {
    if (err) {
      return res.status(404).json({ errmsg: err });
    } else {
      return res.status(200).json(usuariosMod);
    }
  });
};

/* Obtiene un usuario en especifico por su nombre de usuario */
var getUsuario = function(req, res) {
  nombreUser = req.params.nombreUsuario;
  if (nombreUser == "") {
    return res.status(500).json({ errMsg: "No se ha ingresado el usuario" });
  }
  usuariosModel.findOne({ nombreUsuario: nombreUser }, function(err,usuariosMod) {   
    if (err) {
      return res.status(404).json({ errmsg: err });
    } else {
      return res.status(200).json(usuariosMod);
    }
  });
};

/* Crea el usuario */
var createUsuarios = function(req, res) {
  user =req.body.nombreUsuario;
  contra = req.body.password;
  correo = req.body.email;
  if(user == "" || contra == "" || correo == "") {
    return res.status(404).json({ errMsg: "No se puede crear un usuario con campos vacios" });
  }
  var usuariosMod = new usuariosModel({
    nombreUsuario: req.body.nombreUsuario,
    email: req.body.email,
    password: req.body.password,// No es necesario tenerla porque para eso estaba la funcion PRE en el modelo--
    torneosCreados: [], //Cambiar esto por null en caso de que no funcione
    torneosFavoritos: [] //Cambiar esto por null en caso de que no funcione
  });
  usuariosMod.save(function(err, next) {
    if (err) {      
      return res.status(500).json({ errMsg: err });
    } else {      
      //res.status(201).json(usuariosMod);/// Revisar para poder enviarle los datos a Angular y que muestre
      return res.status(201).json(usuariosMod);
    }
  });
};

/* Actualiza los datos del usuario*/
var updateUsuario = function(req, res) { 
  nombreUser = req.params.nombreUsuario;
  contra = req.body.password;
  correo = req.body.email;
  userSession = req.user;
  if(nombreUser == "") {
    return res.status(500).json({ errMsg: "No se puede actualizar porque no se ha ingresado un usuario" });
  }else{
    if (contra == "" && correo == ""){
      return res.status(500).json({ errMsg: "No se puede actualizar porque con campos en blanco" });
    }
  }
  if(userSession == nombreUser){
  usuariosModel.findOne({ nombreUsuario: nombreUser }, function(err,usuariosMod) {
    if (usuariosMod != null) {
      usuariosMod.email = req.body.email;
      usuariosMod.password = req.body.password;
      usuariosMod.torneosCreados =req.body.torneosCreados;
      usuariosMod.save(function(err, next) {
        if (err) {
          return res.status(500).json({ errMsg: err });
        } else {
          return res.status(200).json(usuariosMod);
        }
      });
    } else {
      return res.status(500).json({ errMsg: err });
    }
  });
}else{
  return res.status(404).json({ errMsg: "No se ha iniciado sesión" });
}
};

/* Borra los datos de un usuario*/
var deleteUsuario = function(req, res, next) { 
  nombreUser = req.params.nombreUsuario;
  userSession = req.user;
  if (nombreUser == "") {
    return res.status(500).json({ errMsg: "No se puede actualizar porque no se ha ingresado un usuario" });
  }
  if(userSession == nombreUser){
  usuariosModel.findOne({ nombreUsuario: nombreUser }, function(err,usuariosMod) {
    if(err){
      return res.status(500).json({ errMsg: err });
    }else if(usuariosMod === null){
      return res.status(500).json({ errMsg: "El usuario no existe" });
    }else{
      usuariosMod.remove(function(err) {
        if (err) {
          return res.status(500).json({ errMsg: err });
        } else {
          return res.status(200).json(usuariosMod);
        }
      });
    }
  });
}else{
  return res.status(404).json({ errMsg: "No se ha iniciado sesión" });
}
};

/**Metodo para iniciar sesion */
var login = function(req, res) {
  nombreUser = req.body.nombreUsuario;
  password = req.body.password;
  usuariosModel.findOne({ nombreUsuario: nombreUser }).select('+password').exec(function(err, usuariosMod) {
    if (err) {
      return res.status(500).json({ errMsg: err});
    }
    if (!usuariosMod) {      
      return res.status(404).json({ message: "No existe el usuario" });
    } else {      
      usuariosMod.comparePassword(password,function(err,isMatch){
        if(err){
          return res.status(500).json({ errMsg: "Ha ocurrido un error inesperado, por favor intente nuevamente"+err });
        } if ( isMatch === false){
          return res.status(500).json({ errMsg: "Contraseña incorrecta" });
        }else{
          var token = tokenFunctions.createToken(usuariosMod);
          return res.status(200).json({
            message: 'Sesión iniciada correctamente.',
            token: token
            });
        }
      });
    }
  });
};
/*
 var perteneceTorneo =async function (nombreUser, codTorneo){
  if (nombreUser == "") {
    return res.status(500).json({ errMsg: "No se ha ingresado el usuario" });
  }
  var json = await usuariosModel.findOne({ nombreUsuario: nombreUser });
  var torneosCreados = json.torneosCreados;//--------------------------------- aqui agregue el var ----------
  for (let i = 0; i < torneosCreados.length; i++) {
    var torneo = torneosCreados[i];
    if(torneo == codTorneo){
      return true;
    }  
  }
  return false;
}*/

var getModelUsuario = async function(nombreUser){
  var userModelo = await usuariosModel.findOne({ nombreUsuario: nombreUser});
  if(userModelo == null || userModelo === undefined){
    return null;
  }else{
    return userModelo;
  }
}

module.exports = {
  getListUsuarios,
  createUsuarios,
  getUsuario,
  updateUsuario,
  deleteUsuario,
  login,
  getModelUsuario
};
