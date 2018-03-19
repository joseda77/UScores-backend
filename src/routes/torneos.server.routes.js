const express = require('express');
const torneosController = require('../controllers/torneos.controller');
const app = express.Router();

app.get('/torneos',torneosController.getListTorneos);
//app.post('/torneos',torneosController.crearTorneos);


module.exports = app;