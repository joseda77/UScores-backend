const cors = require('cors');
const express =  require('express');
const PATH = require('path');
const port = process.env.port || '3200';

//Variables de llamados a modulos
const usuarioRoutes = require('./routes/usuarios.server.routes');
const torneoRoutes = require('./routes/torneos.server.routes');
const participaRoutes = require('./routes/participantes.server.routes');
const equipoRoutes = require('./routes/equipos.server.routes');
const encuentrosRoutes = require('./routes/encuentros.server.routes');
const connectBD = require("./server/connection.server");

//Instancia del framework Express
const app = express();
const server = require('http').Server(app); //Para comunicar http con el servidor

//Configuracion
connectBD.functionConnect();// conecta al servidor de base de datos

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use(usuarioRoutes);
app.use(torneoRoutes);
app.use(participaRoutes);
app.use(equipoRoutes);
app.use(encuentrosRoutes);

//Static files
app.use(express.static(PATH.join(__dirname,'dist')));

//Realiza la conexión
server.listen(port,function(){
    console.log('Servidor activo en el localhost:',port);
});


