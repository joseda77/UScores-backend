const express = require('express');
const faseController = require('../controllers/fases.controller');
const app = express.Router();


app.get('/fase', faseController.getFases);
app.get('/fase/:id',faseController.getFase);
app.post('/fase', faseController.createFase);
app.put('/fase/:id', faseController.updateFaseExtern);
app.delete('/fase/:id', faseController.deleteFase);


module.exports = app;