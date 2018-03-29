const express = require('express');
const torneosController = require('../controllers/torneos.controller');
const app = express.Router();

/* Enruta y llama al controlador  que tiene los metodos de Torneos*/

app.get('/torneos',torneosController.getListTorneos);
app.get('/torneos/:codigoTorneo',torneosController.getTorneo);
app.post('/torneos',torneosController.createTorneo);
app.put('/torneos/:codigoTorneo',torneosController.updateTorneo);
app.delete('/torneos/:codigoTorneo',torneosController.deleteTorneo);


module.exports = app;