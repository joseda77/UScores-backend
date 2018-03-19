const usuariosController = require('../controllers/usuarios.controller');
const express = require ('express');
const app = express.Router();


app.get('/usuarios',usuariosController.getListUsuarios);
//app.post('/usuario',usuariosController.crearUsuario);

module.exports = app;
