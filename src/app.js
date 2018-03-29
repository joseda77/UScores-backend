const cors = require('cors');
const express =  require('express');
const PATH = require('path');
const port = process.env.port || '8080';
const ejs = require('ejs'); // Para ejecutar y renderizar vistas html

//Variables de llamados a modulos
const usuarioRoutes = require('./routes/usuarios.server.routes');
const torneoRoutes = require('./routes/torneos.server.routes');
const participaRoutes = require('./routes/participantes.server.routes');
const connectBD = require("./server/connection.server");
//const indexRoutes = require("./routes/index");

//Instancia del framework Express
const app = express();
const server = require('http').Server(app); //Para comunicar http con el servidor

//Configuracion
app.set('views', PATH.join(__dirname,'views'));
app.set('port',port); // Esta linea se puede obviar
app.engine('html',ejs.renderFile);
connectBD.functionConnect();// conecta al servidor de base de datos

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
//app.use(indexRoutes);
app.use(usuarioRoutes);
app.use(torneoRoutes);
app.use(participaRoutes);

//Static files
app.use(express.static(PATH.join(__dirname,'dist')));

//Realiza la conexión
server.listen(port,function(){
    console.log('Servidor activo en el localhost:',port);
});


