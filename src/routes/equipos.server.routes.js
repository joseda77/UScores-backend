const equipoControllers = require("../controllers/equipos.controller");
const express = require('express');
const app = express.Router();

/* Enruta y llama al controlador  que tiene los metodos de los equipos*/

app.get('/equipos', equipoControllers.getListEquipos);
app.get('/equipos/:codigoEquipo',equipoControllers.getEquipo);
app.post('/equipos',equipoControllers.createEquipo);
app.put("/equipos/:codigoEquipo", equipoControllers.updateEquipo);
app.delete("/equipos/:codigoEquipo", equipoControllers.deleteEquipo);


module.exports = app;