const encuentrosModel = require("../models/encuentrosTipo1Models");
const torneoController = require('./torneos.controller');
const equipoController = require('./equipos.controller');
const moment = require("moment");
//const websocketService = require('../service/websocket.service');

let idEncuentro = null;
let consecEncuentro = null;
let faseEncuentro = null;
let equipo1Encuentro = null;
let equipo2Encuentro = null;
let puntajeE1Encuentro = null;
let puntajeE2Encuentro = null;
let estadoEncuentro = null;
let fecha = null;
let usuario= null;


var getListEncuentros = function(req, res) {
  encuentrosModel.find(function(err, encuentrosMod) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(200).json(encuentrosMod);
    }
  });
};

var getEncuentro = function(req, res) {
  idEncuentro = req.params.id;
  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(200).json(encuentrosMod);
    }
  });
};


var createEncuentro = async function(equipo1Encuentro,equipo2Encuentro,faseEncuentro,consecEncuentro,torneo){
  var encuentrosMod = new encuentrosModel({
    torneo:torneo,
    consecutivo: consecEncuentro,
    fase: faseEncuentro,
    equipo1: equipo1Encuentro,
    equipo2: equipo2Encuentro
  });

  try {
    let partido = await encuentrosMod.save();
    return partido._id;
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      return err;
  }
  return err;
  }
}
/*
var createEncuentro = function(req, res) {
  consecEncuentro = req.body.consecutivo;
  faseEncuentro = req.body.fase;
  equipo1Encuentro = req.body.equipo1;
  equipo2Encuentro = req.body.equipo2;
  fecha = new Date (req.body.fechaDeJuego);
  if(consecEncuentro == undefined || faseEncuentro === undefined ||  equipo1Encuentro == undefined ||
    equipo2Encuentro == undefined || req.body.fechaDeJuego  == undefined) {
    return res.status(404).json({ errMsg: "Error al crear el encuentro, algunos campos estan incompletos"});
  }
  if (fecha <= Date.now()) {
      return res.status(404).json({ errMsg: "Error al crear el encuentro, la fecha no puede ser igual o menor a la fecha actual" });
  }
  var encuentrosMod = new encuentrosModel({
    consecutivo: consecEncuentro,
    fase: faseEncuentro,
    equipo1: equipo1Encuentro,
    equipo2: equipo2Encuentro,
    fechaDeJuego: fecha
  });

  encuentrosMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errmsg: err });
    } else {
      return res.status(201).json(encuentrosMod);
    }
  });
};*/

var updateEncuentro = function(req, res) {
  usuario = req.user;
  idEncuentro = req.params.id;
  consecEncuentro = req.body.consecutivo;
  faseEncuentro = req.body.fase;
  equipo1Encuentro = req.body.equipo1;
  equipo2Encuentro = req.body.equipo2;
  puntajeE1Encuentro = req.body.puntajeEquipo1;
  puntajeE2Encuentro = req.body.puntajeEquipo2;
  estadoEncuentro = req.body.estado;
  fecha = req.body.fechaDeJuego;
  
  let torneo = equipoController.getTorneo(usuario,equipo1Encuentro);
  let deporte = torneo.deporte;

  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {
    if (encuentrosMod != null) {
      /**
       * El cero indica si el juego no se ha jugado aún y se puede modificar gran parte del encuentro(0 == Por jugar).
       * El uno indica si el juego se esta jugando (1 == En juego).
       * El dos indica que el encuentro ya fue disputado (2 == jugado).
       */
      if(estadoEncuentro == 0){ // EL encuentro está por jugarse
        if(faseEncuentro != null || faseEncuentro!= undefined){
          encuentrosMod.fase = faseEncuentro;
        } 
        if(equipo1Encuentro != null || equipo1Encuentro != undefined){
          encuentrosMod.equipo1 = equipo1Encuentro;
        } 
        if(equipo2Encuentro != null || equipo2Encuentro != undefined){
          encuentrosMod.equipo2 = equipo2Encuentro;
        }
        if(fecha != null || fecha != undefined){
          if (fecha <= Date.now()) {
            return res.status(404).json({ errMsg: "Error al actualizar el encuentro, la fecha no puede ser igual o menor a la fecha actual" });
          }
          encuentrosMod.fechaDeJuego = fecha;
        }
      }else {
        let team1 = encuentrosMod.equipo1;
        let team2 = encuentrosMod.equipo2;
        if (puntajeE1Encuentro == undefined || puntajeE1Encuentro == null) {
          puntajeE1Encuentro = 0;
          /** Verfica que la puntuación asginada no sea menor que la que ya esta en la BD, para asi evitar errores */
          if(puntajeE1Encuentro < encuentrosMod.puntajeEquipo1){
            puntajeE1Encuentro = encuentrosMod.puntajeEquipo1;
          }
        }
        if (puntajeE2Encuentro == undefined || puntajeE2Encuentro == null) {
          puntajeE2Encuentro = 0;
          /** Verfica que la puntuación asginada no sea menor que la que ya esta en la BD, para asi evitar errores */
          if (puntajeE2Encuentro < encuentrosMod.puntajeEquipo2) { 
            puntajeE2Encuentro = encuentrosMod.puntajeEquipo2;
          }
        }
        // // encuentrosMod.puntajeEquipo1 = puntajeE1Encuentro;
        // // encuentrosMod.puntajeEquipo2 = puntajeE2Encuentro;
        // // let puntosEquipo1 = encuentrosMod.puntajeEquipo1;
        // // let puntosEquipo2 = encuentrosMod.puntajeEquipo2;
        // // if(estadoEncuentro == 2){                           // Representa la culminacion del encuentro
        // //   if (puntosEquipo1 > puntosEquipo2){              // Representa que el equipo2 ganó 
        // //     equipoController.updatePuntaje(team1, 1, 0, 0);
        // //     equipoController.updatePuntaje(team2, 0, 1, 0);
        // //     //Actualizar fase
        // //   } else if (puntosEquipo1 < puntosEquipo2) {       // Representa que el equipo2 ganó
        // //     equipoController.updatePuntaje(team1, 0, 1, 0);
        // //     equipoController.updatePuntaje(team2, 1, 0, 0);

        // //   } else {                                          //Representa que el partido acabo y los equipos empataron
        // //     if (deporte == "futbol"){
        // //       equipoController.updatePuntaje(team1, 0, 0, 1);
        // //       equipoController.updatePuntaje(team2, 0, 0, 1);
        // //     } else if (deporte == "futbol sala") {
        // //       equipoController.updatePuntaje(team1, 0, 0, 1);
        // //       equipoController.updatePuntaje(team2, 0, 0, 1);
        // //     } else if (deporte == "handball") {
        // //       equipoController.updatePuntaje(team1, 0, 0, 1);
        // //       equipoController.updatePuntaje(team2, 0, 0, 1);
        // //     } else if (deporte == "rugby") {
        // //       equipoController.updatePuntaje(team1, 0, 0, 1);
        // //       equipoController.updatePuntaje(team2, 0, 0, 1);
        // //     } else if (deporte == "waterpolo") {
        // //       equipoController.updatePuntaje(team1, 0, 0, 1);
        // //       equipoController.updatePuntaje(team2, 0, 0, 1);
        // //     }
        // //   }      
        // // }        
        //Aqui para actualizar fase en caso de ser necesario
        encuentrosMod.estado = estadoEncuentro;
      }
      encuentrosMod.save(function(err) {
        if (err) {
          return res.status(500).json({ errmsg: err });
        } else {
          return res.status(200).json(encuentrosMod);
        }
      });
    } else {
      return res.status(500).json({ errMsg: err });
    }
  });
};

var deleteEncuentro = function(req, res) {
  idEncuentro = req.params.id;
  encuentrosModel.findById(idEncuentro, function(err, encuentrosMod) {
    if (encuentrosMod != null) {
      encuentrosMod.remove(function(err) {
        if (err) {
          return res.status(500).json({ errmsg: err });
        } else {
          return res.status(201).json({ InfoMsg: "¡Encuentro borrado correctamente!" });
        }
      });
    }else{
      return res.status(500).json({ errmsg: "¡El encuentro no existe!" });
    }
  });
};

var getModeloEquipo = async function (codEquipo) {
  let equipo = await equi
}

var completaEncuetros = async function(numeroPartidos,partido,fase,torneo){
  var tamaño = partido.length;
  if (numeroPartidos == tamaño) { 
    return partido;
  } else if (tamaño < numeroPartidos) {
    for (let i = tamaño + 1; i <= numeroPartidos; i++) {
      let encuentro = await createEncuentro(null, null, fase,1,torneo);
      partido.push(encuentro);
    }
    return partido;
  }
};

var selecEncuentros = async function(arregloEquipos, numeroLlaves, fase,torneo){
  let equipos = arregloEquipos;
  let iteration = numeroLlaves;
  let respuesta = [];
  let partidos = [];
  let partido = null;
  let i=1;
  
  while (equipos.length > 0 && i <=iteration ){
    let random = Math.floor(Math.random() * equipos.length);
    let equipo1 = equipos.splice(random,1);
    let random2 = Math.floor(Math.random() * equipos.length);
    let equipo2 = equipos.splice(random2, 1);
    partido = await createEncuentro(equipo1[0], equipo2[0], fase, i + 1,torneo);
    //console.log("Equipos en el modulo partidos  es:",partidos ,equipo1[0], equipo2[0],undefined)
    partidos.push(partido);
    i++;
  }
  respuesta[0]= partidos;
  respuesta[1] = equipos;
  return respuesta;
}

var createPartidosLiga = async function(equipos,torneo){
  let tamaño = equipos.length;
  let arregloPartidos= [];
  for (let i = 0; i < equipos.length; i++) {
    for (let j = i; j < equipos.length; j++) {
      if(i != j){
        partido = await createEncuentro(equipos[i],equipos[j],1,i,torneo);
        arregloPartidos.push(partido);
      }      
    }    
  }
  return arregloPartidos;
}
module.exports = {
  getEncuentro,
  getListEncuentros,
  createEncuentro,
  updateEncuentro,
  deleteEncuentro,
  completaEncuetros,
  selecEncuentros,
  createPartidosLiga
};
