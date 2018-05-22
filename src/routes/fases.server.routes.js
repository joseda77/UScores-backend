const express = require('express');
const faseController = require('../controllers/fases.controller');
const app = express.Router();


app.get('/fase', faseController.getFases);
app.post('/fase', faseController.createFase);
app.put('/fase/:id', faseController.updateFase);
app.delete('/fase/:id', faseController.deleteFase);


module.exports = app;