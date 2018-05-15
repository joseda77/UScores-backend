//variable que almacena las funcionalidades de mongoose
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var listaParticipantes = [];

var equipoSchema = new Schema ({
    'codigoEquipo':{
        type: String,
        required: true,
        unique: true
    },
    'nombreEquipo':{
        type: String,
        required: true
    },
    'torneo':{ ///----------------------- Se le agregó para verificaciones y validaciones-------------
        type: String,
        required: true
    },
    'fase':{
        type: Number,
        required: true
    },
    'listaParticipantes': {
        type: listaParticipantes,
        required: true
    },
    /*'puntaje': {    // Mirar bien si es String o tiene que ser number
        type: String               
    }*/
    'encuentrosGanados':{
        type: Number
    },
    'encuentrosEmpatados': {
        type: Number
    },
    'encuentrosPerdidos': {
        type: Number
    },
},
{
    versionKey: false
});

module.exports = mongoose.model ('equipo',equipoSchema);