const encuentrosController = require('../controllers/encuentrosTipo2.controller');
const express = require('express');
const app = express.Router();

app.get('/encuentros/tipo2', encuentrosController.getEncuentros);
//app.get('/encuentros/tipo2/:id',encuentrosController.getEncuentro);
app.post('/encuentros/tipo2', encuentrosController.createEncuentro);
//app.put('/encuentros/tipo2/:id',encuentrosController.updateEncuentro);
//app.delete('/encuentros/tipo2/:id', encuentrosController.deleteEncuentro);

module.exports = app;