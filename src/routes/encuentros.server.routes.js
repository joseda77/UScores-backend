const encuentrosController = require('../controllers/encuentros.controller');
const express = require('express');
const app = express.Router();

app.get('/encuentros', encuentrosController.getListEncuentros);
app.get('/encuentros/:id',encuentrosController.getEncuentro);
app.post('/encuentros', encuentrosController.createEncuentro);
app.put('/encuentros/:id',encuentrosController.updateEncuentro);
app.delete('/encuentros/:id', encuentrosController.deleteEncuentro);

module.exports = app;
