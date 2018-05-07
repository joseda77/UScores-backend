var conexion = require("../server/connectionApp.server");
var express = require("express");
const app = express();
var server = conexion.server;
var io = require("socket.io")(server);

var messages = [
  {
    id: 1,
    text: "este es un mensaje",
    author: "Jose"
  }
];

app.get("/", function(req, res) {
  res.status(200).send("Corriendo");
});

io.on("connection", function(socket) {
    console.log("conexion establecida con socket");
    socket.emit("messages", messages);

    socket.on("new-message", function(data) {
      messages.push(data);

      io.sockets.emit("messages", messages);
    });
});


module.exports = app;