const express = require('express');
const participantesController = require('../controllers/participantes.controller');
const app = express.Router();

/* Enruta y llama al controlador  que tiene los metodos de participantes*/

app.get('/participantes', participantesController.getListParticipantes);
app.get('/participantes/:identificacion', participantesController.getParticipante);
app.post('/partipantes', participantesController.createParticipantes);
app.put('/participantes/:identificacion',participantesController.updateParticipante);
app.delete('/participantes/:identificacion',participantesController.deleteParticipante);

module.exports = app;
