const {port_io} = require('../lib/config');
const config = require('../lib/config')
//traemos express para poder usarlo
const express = require('express');
const app = express();
//conectamos express a http para poder luego conectar al webSocket server
const http = require('http');
const server = http.createServer(app);

//conectamos el server con la webSocket
const sockect = require('socket.io');
const io = sockect(server, {
    cors: {
    origin: config.cors,
    methods: ["GET", "POST"]
  }});

//inicializamos socket.io
io.on('connection', () => {
    console.log('usuario conectado')
})

//dejamos escuchando el server en un puerto especifico
server.listen(port_io, async () => {
    console.log(`The server is running on port ${port_io}`)
  })
