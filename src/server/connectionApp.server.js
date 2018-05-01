const express = require("express");
const port = process.env.port || "3200";
const app = express();
const server = require('http').Server(app); //Para comunicar http con el servidor

//Realiza la conexión
var connectAppServer = function () {
    server.listen(port, function() {
      console.log("Servidor activo en el localhost:", port);
    });
}



module.exports = {
    app,
    server,
    connectAppServer
};