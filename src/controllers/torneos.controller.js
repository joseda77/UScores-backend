const torneosModel = require("../models/torneoModels");
const usuariosController = require("./usuarios.controller");
const fasesController = require('./fases.controller');
const encuentro1Controller = require('./encuentrosTipo1.controller');

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
    listaFases: req.body.listaFases //Cambiar esto por null en caso de que no funcione
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
  listFases = req.body.listaFases;
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
          if(listFases != null && listFases != undefined && listFases.length>0){
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
  let tipoTorneo =req.body.tipoTorneo;
  let equipos = req.body.equipo;
  let numeroEquipos = equipos.length;
  let numeroFases = defineNumeroFases(numeroEquipos,tipoTorneo);
  console.log("el numero de fases es: "+numeroFases);
  let arregloDeFases = [];  
  let partido = null;
  if(numeroFases==1){
    return res.status(200).json({ MSG: "EL torneo es una liga o esta compuesto por 2 equipos" }); 
  }
    /** Aqui creamos las fases */
    if(numeroEquipos==2){
      console.log("Se le pide a la fase que se genere con 1 llave y 2 equipos")
    }else{
      let consecutivoFase = 0; /**Es la bandera que me indica cuantas fases se han creado */
     // console.log("el numero de equipos es:", numeroEquipos);
      let infoFase1 = setPartidos(numeroEquipos, numeroFases);
      let fase =  await fasesController.createFase(infoFase1[1],numeroEquipos,infoFase1[1],1);
      arregloDeFases.push(fase);
      consecutivoFase = 1;
      console.log("antes del if",numeroEquipos);
      if(infoFase1[0]!=0){
        let partidoArray = [];
        numeroEquipos = 2 ** Math.floor(Math.log2(numeroEquipos));        
        //console.log("el numero de equipos es:", numeroEquipos);
        let numLlaves = numeroEquipos/2;         
        /**se crea el partido para enviarselo como parametro a la siguiente fase que se crea */
        for (let i = 0; i < infoFase1[0]; i++) {
          let random = Math.floor((Math.random() * equipos.length) + 1);
          partido = encuentro1Controller.createEncuentro(equipos[random],null,fase,1);
          //console.log("La lista de equipo", equipos);
          equipos.splice(random,1);
          //console.log("El partido es",partido);
          //console.log("La lista de equipo",equipos);
          partidoArray.push(partido);
        }
        partidoArray = encuentro1Controller.completaEncuetros(numLlaves,partidoArray,2);
        //console.log("Esta monda es ", numLlaves, partidoArray);
        fase = await fasesController.createFase(numLlaves, numeroEquipos, numLlaves, 2);
        arregloDeFases.push(fase);
        fasesController.updateEquiposFase(1,equipos);
        console.log(arregloDeFases[0]);
        consecutivoFase++;
      }
      console.log("antes del if",numeroEquipos);
      //console.log("Despues del precioso if:",infoFase1[0], infoFase1[1], numeroEquipos);      
      numeroEquipos = 2 ** Math.floor(Math.log2(numeroEquipos));
      //console.log("el numero de equipos es:", numeroEquipos);
      /**Agregar las fases que faltan 
        y colocarle una bandera a la creacion fase2 para saber cuantas fases mas se tiene que crear aqui */
      for (let i = consecutivoFase; i <= numeroFases; i++) {
        let numEquiAvanzan = numeroEquipos / 2;
        let arrgloParti = []
        for (let j = 0; j < numEquiAvanzan; j++) {
          let parti = encuentro1Controller.createEncuentro(null,null,consecutivoFase,j+1);
          arrgloParti.push(parti);           
        }
        fase = 
        console.log("el numero de equipos es:", numEquiAvanzan,numeroEquipos,numEquiAvanzan, consecutivoFase);
      }
    }
   // console.log("Las fases son",arregloDeFases);
    //console.log(numeroEquipos);
  return res.status(200).json({MSG: "ok"});
}
/** Metodo que asigna el numero de partidos que se jugaran en la primera fase,
 * este metodo ayuda a que se organice de forma correcta el numero de juegos y la asignacion
 * de partidos. En la posicion 0 del arreglo estará el numero de equipos que avanzan sin jugar,
 * en la posicion 1 del arreglo estará el numero de partidos de la primera llave
 * Por ahora funciona para la fase inicial*/
var setPartidos= function(numeroEquipos, numerodeFases) {
  let valorEnMedio = ((2 ** numerodeFases) / 4); //Valor del dato en medio entre 2^n y 2^(n-1) 
  let valorActual = 2 ** numerodeFases;            // Numero de equipos asociado a un numero de fases
  let valorAnterior = 2 ** (numerodeFases - 1);  // Numero de equipos asociado al numero de fases -1
  let valorMedio = valorActual - valorEnMedio;// Numero entre 2^n y 2^(n-1)
  let resultado = 0;
  let valor = 0;
  let arrayRes = [];
  let numLlaves = numeroEquipos - 2 ** (Math.floor(Math.log2(numeroEquipos)));
  if (numeroEquipos == 2 ** numerodeFases) {
    arrayRes.push(0, numLlaves);
    return arrayRes;    
  } else {
    if (valorActual > numeroEquipos && numeroEquipos > valorMedio) {
      /** Sumar para hallar el numero de partidos que se jugar�*/
      valor = numeroEquipos - valorMedio;      
      resultado =valorEnMedio - valor;
      arrayRes.push(resultado, numLlaves);
      return arrayRes;
    } else if (numeroEquipos > valorAnterior && numeroEquipos < valorMedio) {
      /** Restar para hallar el numero de partidos que se jugar�*/
      valor = valorMedio - numeroEquipos;
      resultado = valorEnMedio - valor;
      arrayRes.push(resultado, numLlaves);      
      return arrayRes;
    } else {
      arrayRes.push(valorEnMedio, numLlaves);
      return arrayRes;      
    }
  }
};


module.exports = {
  getListTorneos,
  getTorneo,
  createTorneo,
  updateTorneo,
  deleteTorneo,
  getModelTorneo,
  createFases
};
