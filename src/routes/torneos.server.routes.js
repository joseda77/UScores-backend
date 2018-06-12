const express = require('express');
const torneosController = require('../controllers/torneos.controller');
const auth = require("../middlewares/auth");
const app = express.Router();

/* Enruta y llama al controlador  que tiene los metodos de Torneos*/

app.get('/torneos',torneosController.getListTorneos);
app.get('/torneos/:codigoTorneo',torneosController.getTorneo);
app.post('/torneos',auth,torneosController.createTorneo);
app.put('/torneos/:codigoTorneo',auth,torneosController.updateTorneo);
app.delete('/torneos/:codigoTorneo',auth,torneosController.deleteTorneo);

module.exports = app;