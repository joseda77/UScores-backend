const usuariosController = require("../controllers/usuarios.controller");
const auth = require("../middlewares/auth");
const express = require("express");
const app = express.Router();

/* Enruta y llama al controlador  que tiene los metodos de usuarios*/

app.get("/usuarios", usuariosController.getListUsuarios);
app.get("/usuarios/:nombreUsuario", usuariosController.getUsuario);
app.post("/usuarios", usuariosController.createUsuarios);
app.put("/usuarios/:nombreUsuario", auth, usuariosController.updateUsuario);
app.delete("/usuarios/:nombreUsuario", usuariosController.deleteUsuario);
app.get("/login/:nombreUsuario", usuariosController.login);

module.exports = app;
