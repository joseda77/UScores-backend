const torneosModel = require("../models/torneoModels");
const usuariosController = require("./usuarios.controller");
const fasesController = require('./fases.controller');

let idTorneo = null;
let deporteTorneo = null;
let numFaseTorneo = null;
let tipTorneo = null;
let listEquipos = null;
let listPartidos = null;
let nameTorneo = null;
let statusTorneo = null;

/* Obtiene la lista de los torneos  */
var getListTorneos = function(req, res) {
  torneosModel.find(function(err, torneosMod) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      return res.status(200).json(torneosMod);
    }
  });
};

/* Obtiene un solo torneo de acuerdo a su codigo */
var getTorneo = function(req, res, next) {
  idTorneo = req.params.codigoTorneo;
  torneosModel.findOne({ codigoTorneo: idTorneo }, function(err, torneosMod) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      return res.status(200).json(torneosMod);
    }
  });
};

/* Crea todos los torneos  */
var createTorneo = function(req, res) {
  console.log(req.user)
  var torneosMod = new torneosModel({
    codigoTorneo: req.body.codigoTorneo,
    nombreTorneo: req.body.nombreTorneo,
    deporte: req.body.deporte,
    tipoTorneo: req.body.tipoTorneo,
    numeroFases: req.body.numeroFases,
    adminTorneo: req.user,
    listaEquipos: req.body.listaEquipos, //Cambiar esto por null en caso de que no funcione
    listaPartidos: req.body.listaPartidos //Cambiar esto por null en caso de que no funcione
  });

  torneosMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      return res.status(201).json(torneosMod);
    }
  });
};

/* Actualiza los datos de un torneo */
var updateTorneo = async function(req, res, next) {
  idTorneo = req.body.codigoTorneo;
  nameTorneo = req.body.nombreTorneo;
  tipTorneo = req.body.tipoTorneo;  
  deporteTorneo = req.body.deporte;
  listEquipos = req.body.listaEquipos;
  listPartidos = req.body.listaPartidos;
  statusTorneo = req.body.estado;
 /* var torneoPerteneceUsuario = await usuariosController.perteneceTorneo(req.user, idTorneo);
  if(torneoPerteneceUsuario === false){
    return res.status(400).json({ errMsg: "Usuario no autorizado para modificar este torneo" });
  }else{*/
  var torneo = await torneosModel.findOne({codigoTorneo: idTorneo});  
  if(!(req.user === torneo.adminTorneo)){
    return res.status(404).json({ errMsg: "Usted no esta autorizado para modificar el torneo" });
  }else{
    torneosModel.findOne({ codigoTorneo: idTorneo }, function(err, torneosMod) {
      if (torneosMod != null) {
        if(nameTorneo != null || nameTorneo != undefined){
          torneosMod.nombreTorneo = nameTorneo;
        }        
        if(torneosMod.estado === 0){
          if(deporteTorneo != null && deporteTorneo != undefined){
            torneosMod.deporte = deporteTorneo;
          }
          if(tipTorneo != null && tipTorneo != undefined){
            torneosMod.tipoTorneo = tipTorneo;
          } 
          if (listEquipos != null && listEquipos != undefined && listEquipos.length>0){
            torneosMod.listaEquipos =  listEquipos;//Cambiar esto por null en caso de que no funcione
          }
          if(listEquipos != null && listEquipos != undefined && listEquipos.length>0){
            torneosMod.listaPartidos =  listPartidos;//Cambiar esto por null en caso de que no funcione
          }
          if(statusTorneo != null && statusTorneo != undefined && statusTorneo!=0){
            torneosMod.estado = statusTorneo;
          }
        }       
        torneosMod.save(function(err) {
          if (err) {
            return res.status(500).json({ errMsg: err });
          } else {
            return res.status(200).json(torneosMod);
          }
        });
      } else {
        return res.status(500).json({ errMsg: err });
      }
    });
  }
};


/* Borra un torneo de la BD*/
var deleteTorneo = function(req, res, next) {
  idTorneo = req.params.codigoTorneo;
  torneosModel.findOne({ codigoTorneo: idTorneo }, function(err, torneosMod) {
    torneosMod.remove(function(err) {
      if (err) {
        return res.status(500).json({ errMsg: err });
      } else {
        return res.status(200).json(torneosMod);
      }
    });
  });
};

/*
var perteneceEquipo = async function(nombreUsuario, torneo, equipo){
  var torneo = torneosModel.findOne({torneo});
  var listaEquipos = torneo.listaEquipos;
  for (let i = 0; i <listaEquipos.length; i++) {
    if(listaEquipos[i] == equipo){
      var torneoPerteneceUsuario = await usuariosController.perteneceTorneo(nombreUsuario,torneo);
      if(torneoPerteneceUsuario == true){
        return true;
      }
    }    
  }
  return false;
}*/

var getModelTorneo = async function(codTorneo){
  var torneo = await torneosModel.findOne({codigoTorneo: codTorneo});
  if(torneo === undefined || torneo == null){
    return null;
  }else {
    return torneo;
  }
}

/**Metodo que retorna el numero de fases correspondientes a un torneo de acuerdo con el numero
 *de equipos ingresado 
 */
var defineNumeroFases = function(numeroEquipos, tipoTorneo){
  if(tipoTorneo == 1){  //si es uno entonces es una liga
    return 1;
  }else if(tipoTorneo == 2) { //si es dos entonces es un feaxture o llaves o cruces directos
    if(numeroEquipos >= 2){ // Entra si hay dos o mas equipos
      return Math.ceil(Math.log2(numeroEquipos));
    }else{  // Si numero de equipos es 0 o 1 retorne un negativo que sirve para la comparacion
      return -999;
    }
  }
}

/**Metodo que se invoca desde el torneo y llama a crear fases en el controlador */
var createFases = async function (req,res) {
  let numeroFases =req.body.numeroFases;
  let equipos = req.body.equipo;
  let numeroEquipos = equipos.length;
  let arregloDeFases = [];
  let consecutivoFase = 0;
  for (let i = 0; i < numeroFases; i++) {
    var fase = await fasesController.createFase(i*2,numeroEquipos,i/2,i);
    console.log(fase);
  }
  return res.status(200).json({MSG: "ok"});
}


module.exports = {
  getListTorneos,
  getTorneo,
  createTorneo,
  updateTorneo,
  deleteTorneo,
  getModelTorneo,
  createFases
};
