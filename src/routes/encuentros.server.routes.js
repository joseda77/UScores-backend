const encuentrosController = require('../controllers/encuentrosTipo1.controller');
const websocketService = require('../service/websocket.service');
const express = require('express');
const app = express.Router();

app.get('/encuentros/tipo1', encuentrosController.getListEncuentros);
app.get('/encuentros/tipo1/:id',encuentrosController.getEncuentro);
app.post('/encuentros/tipo1', encuentrosController.createEncuentro);
app.put('/encuentros/tipo1/:id',encuentrosController.updateEncuentro);
app.delete('/encuentros/tipo1/:id', encuentrosController.deleteEncuentro);

module.exports = app;
