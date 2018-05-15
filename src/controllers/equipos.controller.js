const equiposModel = require("../models/equipoModels");
const torneosController = require("./torneos.controller");
const usuariosController = require("./usuarios.controller");

let codigoEq = null;
let idUsuario = null;
let nameEquipo = null;
let faseEquipo = null;
let listParticipantes= null;
let parGanaEquipo = null;
let parPierEquipo = null;
let parEmpaEquipo = null;
let tamañoArreglo = null;
let torneoEquipo = null;

/* Obtiene la lista de equipos */
var getListEquipos = function(req, res) {
  equiposModel.find(function(err, equiposMod) {
    if (err) {
      return res.status(404).json({ errmsg: err });
    } else {
      return res.status(200).json(equiposMod);
    }
  });
};

/* Obtiene un equipo en especifico por su nombre y su torneo*/
var getEquipo = function(req, res) {
  codigoEq = req.params.codigoEquipo;
  equiposModel.findOne({ codigoEquipo: codigoEq }, function(err, equiposMod) {
    if (err) {
      return res.status(404).json({ errmsg: err });
    } else {
      return res.status(200).json(equiposMod);
    }
  });
};

/* Crea un equipo */
var createEquipo =  function(req, res) {  
  var equiposMod = new equiposModel({
    codigoEquipo: req.body.codigoEquipo,
    nombreEquipo: req.body.nombreEquipo,
    fase: 1,
    torneo: req.body.torneo,
    puntaje: ""
  });

  equiposMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(201).json(equiposMod);
      console.log("Equipo guardado satisfactoriamente"); //--------------------------------------------
    }
  });
};

var updateEquipo = async function(req, res) {
  idUsuario = req.user;
  codigoEq = req.params.codigoEquipo;
  nameEquipo = req.body.nombreEquipo;
  faseEquipo = req.body.fase;
  listParticipantes = req.body.listaParticipantes;
  tamañoArreglo = listParticipantes.length;
  parGanaEquipo = req.body.encuentrosGanados;
  parEmpaEquipo = req.body.encuentrosEmpatados;
  parPierEquipo = req.body.encuentrosPerdidos;
  torneoEquipo = req.body.torneo;
  let torneo = null;
  if (idUsuario != undefined) {
    torneo = await getTorneo(idUsuario, torneoEquipo);
  }else{
    return res.status(404).json({ errMsg: "Usuario no autorizado para realizar esta acción." });
  }
  if(torneo == null || torneo == undefined){
    return res.status(404).json({ errMsg: "Usuario no autorizado para realizar esta acción." });
  }else{
    console.log(torneo);  
    equiposModel.findOne({ codigoEquipo: codigoEq }, function(err, equiposMod) {
      if (equiposMod != null) {
        if(nameEquipo != null && nameEquipo != undefined){
          equiposMod.nombreEquipo = nameEquipo;
        }
        if(faseEquipo != null && nameEquipo != undefined){
          equiposMod.fase = faseEquipo;
        }
        if (listParticipantes != null && listParticipantes != undefined && tamañoArreglo> 0) {
          if(torneo.deporte === "futbol"){
            if (tamañoArreglo >= 11 && tamañoArreglo <= 30) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else{
              return res.status(400).json({ errMsg: "¡El equipo de fútbol debe tener de 11 a 30 participantes!" });
            }
          }else if(torneo.deporte === "futbol sala"){
            if (tamañoArreglo >= 5 && tamañoArreglo <= 15) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else {
              return res.status(400).json({ errMsg: "¡El equipo de fútbol sala debe tener de 5 a 15 participantes!" });
            }
          }else if (torneo.deporte === "voleibol") {
            if (tamañoArreglo >= 6 && tamañoArreglo <= 15) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else{
              return res.status(400).json({ errMsg: "¡El equipo de voleiból debe tener de 6 a 15 participantes!" });
            }
          }else if (torneo.deporte === "baloncesto") {
            if (tamañoArreglo >= 5 && tamañoArreglo <= 12) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else{
              return res.status(400).json({ errMsg: "¡El equipo de baloncesto debe tener de 5 a 12 participantes!" });
            }
          }else if (torneo.deporte === "handball") {
            if (tamañoArreglo >= 7 && tamañoArreglo <= 15) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else{
              return res.status(400).json({ errMsg: "¡El equipo de balón mano debe tener de 7 a 15 participantes!" });
            }
          }else if (torneo.deporte === "rugby") {
            if (tamañoArreglo >= 15 && tamañoArreglo <= 30) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else{
              return res.status(400).json({ errMsg: "¡El equipo de rugby debe tener de 15 a 30 participantes!" });
            }
          }else if (torneo.deporte === "softbol") {
            if (tamañoArreglo >= 9 && tamañoArreglo <= 15) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else{
              return res.status(400).json({ errMsg: "¡El equipo de sóftbol debe tener de 9 a 15 participantes!" });
            }
          }else if (torneo.deporte === "ultimate") {
            if (tamañoArreglo >= 7 && tamañoArreglo <= 15) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else{
              return res.status(400).json({ errMsg: "¡El equipo de ultimate debe tener de 7 a 15 participantes!" });
            }
          }else if (torneo.deporte === "waterpolo") {
            if (tamañoArreglo >= 7 && tamañoArreglo <= 15) {
              equiposMod.listaParticipantes = listParticipantes; // Cambiar por lo que se reciba
            }else{
              return res.status(400).json({ errMsg: "¡El equipo de waterpolo debe tener de 7 a 15 participantes!" });
            }
          }
        }
        if (parGanaEquipo != null && parGanaEquipo != undefined){
          equiposMod.puntaje = parGanaEquipo;
        }
        if (parEmpaEquipo != null && parEmpaEquipo != undefined) {
          equiposMod.puntaje = parGanaEquipo;
        }
        if (parPierEquipo != null && parPierEquipo != undefined) {
          equiposMod.puntaje = parGanaEquipo;
        }           
        equiposMod.save(function(err) {
          if (err) {
            return res.status(500).json({ errmsg: err });
          } else {
            return res.status(200).json(equiposMod);
          }
        });
      } else {
        return res.status(500).json({ errMsg: err });
      }
    });
  } 
};

var deleteEquipo = function(req, res) {
  codigoEq = req.params.codigoEquipo;
  equiposModel.findOne({ codigoEquipo: codigoEq }, function(err, equiposMod) {
    equiposMod.remove(function(err) {
      if (err) {
        return res.status(500).json({ errmsg: err });
      } else {
        return res.status(200).json(equiposMod);
      }
    });
  });
};


var getTorneo = async function(codUsuario, codigoTorneo/*codigoEquipo*/){
  // var usuarioModel = await usuariosController.getModelUsuario(codUsuario);
  // if(usuarioModel != null || usuarioModel!= undefined){
    // var torneosCreados = usuarioModel.torneosCreados;
    // for (let i = 0; i < torneosCreados.length; i++) {
    //   var torneo = torneosCreados[i];
    var modelo = await torneosController.getModelTorneo(/*torneo*/codigoTorneo);
    if(modelo != null || modelo != undefined){
      return modelo;
    }
    //   if((modelo.listaEquipos).includes(codigoEquipo)){
    
    //   }
    // }
  //} 
  return null;
}


/** Metodo para actualizar el puntaje de un equipo luego de disputarse el encuentro, tiene como parametros: 
 * gana, pierde, empata. Esto se define si un equipo pieder entonces llega un 1 en ese parametro y cero en el resto
 *  y asi en los otros casos.
 */
var updatePuntaje = function(equipo, gana, pierde, empata){  
  equiposModel.findOne({ codigoEquipo: equipo },function (err, equiposMod) {
    if(gana == 1){
      equiposMod.encuentrosGanados += 1;
    }else if(pierde == 1){
      equiposMod.encuentrosPerdidos += 1;
    }else if(empata == 1){
      equiposMod.encuentrosEmpatados += 1;
    }
    equiposMod.save(function(err){
      if(err){
        return err;
      }
    });
  });
}

var updateFase = function(equipo, numeroFasesTorneo){
  equiposModel.findOne({ codigoEquipo: equipo}, function(err, equiposMod){
    if (equiposMod.fase< numeroFasesTorneo){ /** Si el numero de fases del equipo es menor a las del torneo, se puede actualizar */
      equiposMod.fase += 1;
    }
    equiposMod.save(function (err,next) {
      if (err) {
        next (err);
      }
    });
  });
}

module.exports = {
  getEquipo,
  getListEquipos,
  createEquipo,
  updateEquipo,
  deleteEquipo,
  getTorneo,
  updatePuntaje,
  updateFase
};
