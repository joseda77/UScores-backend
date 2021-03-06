//variable que almacena las funcionalidades de mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const url = "mongodb://localhost/bduscores";

//Función de conexión a la BD
const functionConnect = function() {
  mongoose.connect( url, function(err) {
    if (err) console.log("Error al conectar a la base de datos UScores: ", err);
    else console.log("Conexion exitosa a la base de datos de UScores");
  });
}


//Exportar funciones y modulos
module.exports ={
  functionConnect
};