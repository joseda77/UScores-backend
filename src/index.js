const cors = require('cors');
const express =  require('express');
const PATH = require('path');
const app = express();
const server = require('http').Server(app); //Para comunicar http con el servidor
const port = process.env.port || '8080';
const path = require('path');
const ejs = require('ejs'); // Para ejecutar y renderizar vistas html

//Variables de llamados a modulos
const connectBD = require("./server/connectionServer.js");
const indexRoutes = require("./routes/index");
const taskRoutes = require('./routes/task')

//Configuracion
app.set('views', path.join(__dirname,'views'));
app.set('port',port); // Esta linea se puede obviar
app.engine('html',ejs.renderFile);
connectBD.functionConnect();// conecta al servidor de base de datos

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use(indexRoutes);
app.use('/api',taskRoutes);


//Revaliza la conexión
server.listen(port,function(){
    console.log('Servidor activo en el localhost:',port);
});


