const usuariosModel = require("../models/usuarioModels");
const tokenFunctions = require("../service/token.service");

let nombreUser = null;

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
var getUsuario = function(req, res, next) {
  nombreUser = req.params.nombreUsuario;
  usuariosModel.findOne({ nombreUsuario: nombreUser }, function(err,usuariosMod) {
    if (err) {
      return res.status(404).json({ errMsg: err });
    } else {
      return res.status(200).json(usuariosMod);
    }
  });
};

/* Crea el usuario */
var createUsuarios = function(req, res) {
  var usuariosMod = new usuariosModel({
    nombreUsuario: req.body.nombreUsuario,
    email: req.body.email,
    //password: req.body.password,// No es necesario tenerla porque para eso estaba la funcion PRE en el modelo--
    torneosCreados: [], //Cambiar esto por null en caso de que no funcione
    torneosFavoritos: [] //Cambiar esto por null en caso de que no funcione
  });

  usuariosMod.save(function(err, next) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      //res.status(201).json(usuariosMod);/// Revisar para poder enviarle los datos a Angular y que muestre
      return res.status(201).json({
        token: tokenFunctions.createToken(usuariosMod)
      });
    }
  });
};

/* Actualiza los datos del usuario*/
var updateUsuario = function(req, res, next) {
  nombreUser = req.body.nombreUsuario;
  usuariosModel.findOne({ nombreUsuario: nombreUser }, function(err,usuariosMod) {
    if (usuariosMod != null) {
      usuariosMod.email = req.body.email;
      usuariosMod.password = req.body.password;
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
};

/* Borra los datos de un usuario*/
var deleteUsuario = function(req, res, next) {
  nombreUser = req.params.nombreUsuario;
  usuariosModel.findOne({ nombreUsuario: nombreUser }, function(err,usuariosMod) {
    usuariosMod.remove(function(err) {
      if (err) {
        return res.status(500).json({ errMsg: err });
      } else {
        return res.status(200).json(usuariosMod);
      }
    });
  });
};

/**Metodo para iniciar sesion */
var login = function(req, res, next) {
  console.log("Entra en el login", req.params.nombreUsuario);//---------------------------------------------------------------
  nombreUser = req.params.nombreUsuario;
  usuariosModel.findOne({ nombreUsuario: nombreUser }, function(err, usuariosMod) {
    console.log("Entra en la funcion", usuariosMod)//----------------------------------------------------------------
    if (err) {
      return res.status(500).json({ errMsg: err });
    }
    if (!usuariosMod) {
      return res.status(404).json({ message: "No existe el usuario" });
    } else {
      req.usuariosModel = usuariosMod; ///------Linea que puede generar error-- ----------
      return res.status(200).json({
        message: 'Sesión iniciada correctamente.',
        token: tokenFunctions.createToken(usuariosMod)
      });
    }
  });
};

module.exports = {
  getListUsuarios,
  createUsuarios,
  getUsuario,
  updateUsuario,
  deleteUsuario,
  login
};
