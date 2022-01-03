const config = require('../lib/config')
//traemos express para poder usarlo
const express = require('express');
const app = express();
//conectamos express a http para poder luego conectar al webSocket server
const http = require('http');
const server = http.createServer(app);

//conectamos el server con la webSocket
const socket = require('socket.io');
const io = socket(server, {
    cors: {
    origin: config.cors,
    methods: ["GET", "POST"]
  }});

//inicializamos socket.io
io.on('connection', (socket) => {
  
  socket.on('conectado', () => {
    console.log(`usuario conectado`);
  });
    
});

module.exports = server

