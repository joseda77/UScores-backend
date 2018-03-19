const express = require('express');
const participantesController = require('../controllers/participantes.controller');

const app = express.Router();

app.get('/participantes', participantesController.getListParticipantes);
app.post('/partipantes', participantesController.crearParticipantes);

module.exports = app;
