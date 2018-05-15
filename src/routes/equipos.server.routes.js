const equipoControllers = require("../controllers/equipos.controller");
const auth = require('../middlewares/auth');
const express = require('express');
const app = express.Router();

/* Enruta y llama al controlador  que tiene los metodos de los equipos*/

app.get('/equipos',equipoControllers.getListEquipos);
app.get('/equipos/:codigoEquipo',equipoControllers.getEquipo);
app.post('/equipos',auth,equipoControllers.createEquipo);
app.put("/equipos/:codigoEquipo",auth, equipoControllers.updateEquipo);
app.delete("/equipos/:codigoEquipo", auth,  equipoControllers.deleteEquipo);


module.exports = app;