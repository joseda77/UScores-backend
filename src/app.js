const cors = require("cors");
const express = require("express");
const PATH = require("path");

//Variables de llamados a modulos
const usuarioRoutes = require("./routes/usuarios.server.routes");
const torneoRoutes = require("./routes/torneos.server.routes");
const participaRoutes = require("./routes/participantes.server.routes");
const equipoRoutes = require("./routes/equipos.server.routes");
const encuentrosRoutes = require("./routes/encuentros.server.routes");
const connectBD = require("./server/connectionDB.server");
const connectApp = require("./server/connectionApp.server");
const webSocket = require("./service/websocket.service");

//Instancia del framework Express
const app = connectApp.app;
const server = connectApp.server;

//Configuracion
connectBD.functionConnect(); // conecta al servidor de base de datos
connectApp.connectAppServer();

//Static files
app.use(express.static(PATH.join(__dirname,"public")));
app.use(express.static(PATH.join(__dirname,"dist")));

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(usuarioRoutes);
app.use(torneoRoutes);
app.use(participaRoutes);
app.use(equipoRoutes);
app.use(encuentrosRoutes);
app.use(webSocket);