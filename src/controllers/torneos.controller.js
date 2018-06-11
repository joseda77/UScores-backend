const torneosModel = require("../models/torneoModels");
const usuariosController = require("./usuarios.controller");
const fasesController = require('./fases.controller');
const encuentro1Controller = require('./encuentrosTipo1.controller');

let idTorneo = null;
let deporteTorneo = null;
let tipTorneo = null;
let listEquipos = null;
let listPartidos = null;
let nameTorneo = null;
let statusTorneo = null;

/* Obtiene la lista de los torneos  */
var getListTorneos = function(req,res) {
  
  torneosModel.find(function(err, torneosMod) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      return res.status(200).json(torneosMod);
    }
  });
};

/* Obtiene un solo torneo de acuerdo a su codigo */
var getTorneo = function(req, res) {
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
var createTorneo = async function(req, res) {
  const listaEquipos = req.body.listaEquipos;  
  let torneoType = req.body.tipoTorneo;
  /**Preguntar porque despues del await se borra el arreglo de equipos re.body.listaEquipos */
  // let listaFases = await createFases(torneoType, listaEquipos);
  // let numFases = listaFases.length;  
  var torneosMod = new torneosModel({
    codigoTorneo: req.body.codigoTorneo,
    nombreTorneo: req.body.nombreTorneo,
    deporte: req.body.deporte,
    tipoTorneo: req.body.tipoTorneo,
    //numeroFases: numFases,
    adminTorneo: req.user,
    listaEquipos: req.body.listaEquipos, //Cambiar esto por null en caso de que no funcione
    //listaFases: listaFases //Cambiar esto por null en caso de que no funcione
  });
  let listaFases = await createFases(torneoType, listaEquipos);
  let numFases = listaFases.length;
  torneosMod.numeroFases = numFases;
  torneosMod.listaFases = listaFases;

  torneosMod.save(function(err) {
    if (err) {
      return res.status(500).json({ errMsg: err });
    } else {
      return res.status(201).json(torneosMod);
    }
  });
};

/* Actualiza los datos de un torneo */
var updateTorneo = async function(req, res) {
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
var deleteTorneo = function(req, res) {
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
var defineNumeroFases = async function(numeroEquipos, tipoTorneo){
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

/**Metodo que se invoca desde el torneo y crea las fases de acuerdo a una lista de torneos 
 * y un tipo de torneo, utiliza metodos del controlador de fases y el controlador de encuentros1
*/
var createFases = async function (torneoType, equiposList) {  
  //let tipoTorneo =req.body.tipoTorneo;
  //let equipos = req.body.equipos;
  let tipoTorneo = torneoType;
  let equipos = equiposList;
  let numeroEquipos = equipos.length;
  let numeroFases = await defineNumeroFases(numeroEquipos,tipoTorneo);
  let arregloDeFases = [];  
  let partido = null;
  let partidoArray = [];
  let fase = null;
  /**Este if es para cuando se crea una y solo una fase */
  if(tipoTorneo==1 || numeroEquipos==2 || numeroFases==1){
    let numeroEncuentros = (equipos.length) - 1;
    partidoArray = await encuentro1Controller.createPartidosLiga(equipos);
    fase = await fasesController.createFase(numeroEncuentros, numeroEquipos,0,1, partidoArray);
    arregloDeFases.push(fase);
    return arregloDeFases;
  }else{/**Este if es para cuando se crea dos o mas*/
      let consecutivoFase = 0; /**Es la bandera que me indica cuantas fases se han creado */
      let infoFase1 = setPartidos(numeroEquipos, numeroFases);
      let numSalvados = infoFase1[0];
      let numeroEncuentros = infoFase1[1];
      let respuesta = null;
      let tamaño = 0;
      fase = null;
      partidoArray = [];
      /** El numero de salvados es el numero de equipos que avanzan directo a la siguiente fase */
      if (numSalvados == 0){
        respuesta = await encuentro1Controller.selecEncuentros(equipos, numeroEquipos/2,1);
        partidoArray=respuesta[0];
        fase = await fasesController.createFase(numeroEncuentros, numeroEncuentros*2,numeroEncuentros,1, partidoArray);
        arregloDeFases.push(fase);
        consecutivoFase = 1;  
      }else {
        partidoArray = [];
        respuesta = await encuentro1Controller.selecEncuentros(equipos,numeroEncuentros,1);
        partidoArray=respuesta[0];      
        fase = await fasesController.createFase(numeroEncuentros, numeroEncuentros*2,numeroEncuentros,1, partidoArray);
        arregloDeFases.push(fase);
        consecutivoFase = 1;      
        numeroEquipos = 2 ** Math.floor(Math.log2(numeroEquipos));
        let numLlaves = numeroEquipos/2;
        tamaño = equipos.length;
        let respuesta2 = await encuentro1Controller.selecEncuentros(equipos, numLlaves,2);
        partidoArray= respuesta2[0];
        partidoArray = await encuentro1Controller.completaEncuetros(numLlaves,partidoArray,2);
        fase = await fasesController.createFase(numLlaves, numeroEquipos, numLlaves, 2,partidoArray);
        arregloDeFases.push(fase);
        consecutivoFase++;
        numeroEquipos= tamaño;
      }
      numeroEquipos = 2 ** Math.floor(Math.log2(numeroEquipos));
      /**Agregar las fases que faltan 
        y colocarle una bandera a la creacion fase2 para saber cuantas fases mas se tiene que crear aqui */
      for (let i = consecutivoFase+1; i <= numeroFases; i++) {
        //console.log("Entra aqui", numeroEquipos, i, numeroFases);
        numeroEquipos = numeroEquipos / 2;
        let numEquiAvanzan = Math.ceil(numeroEquipos / 2);
        let arregloParti = await encuentro1Controller.completaEncuetros(numEquiAvanzan, [], i);
        fase = await fasesController.createFase(numEquiAvanzan, numeroEquipos,numEquiAvanzan, i,arregloParti);
        arregloDeFases.push(fase);
      }
    }
  return arregloDeFases;
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
