//variable que almacena las funcionalidades de mongoose
const express = require('express');
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const app = express();

//variables globales
var arrParticipantes = [];
var torneosCreados = [];
var torneosFavoritos = [];

//Función de conexión a la BD
const functionConnect = function() {
  mongoose.connect("mongodb://localhost/bduscores", function(err) {
    if (err) console.log("Error al conectar a la base de datos UScores: ", err);
    else console.log("Conexion exitosa a la base de datos de UScores");
  });
}

//Crear Colecciones
//arrParticipantes.push(parametros);

var usuarioSchema = new Schema({
  'nombreUsuario': { type: String,
    required: true,
    unique: true
  },
  'email': {type: String,
    required: true,
    unique: true
  },
  'password': {type:String,
    required: true
  },
  'torneosCreados': torneosCreados,
  'torneosFavoritos': torneosFavoritos
});

var torneoSchema = new Schema({
  'codigoTorneo': {
    type: String,
    required: true,
    unique: true
  },
  'nombreTorneo': {
    type: String,
    required: true
  },
  'tipoTorneo': {
    type: Number,
    required: true
  },
  'participantes': {
    type: arrParticipantes,
    required: true
  }
});

var participanteSchema = new Schema({
  'identificacion': {
    type: String,
    required: true
  },
  'nombreParticipante': String
});



//Exportar funciones y modulos
module.exports ={
  functionConnect
};