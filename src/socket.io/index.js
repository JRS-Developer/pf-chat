const config = require('../lib/config')
//traemos express para poder usarlo
const express = require('express')
const app = express()
//conectamos express a http para poder luego conectar al webSocket server
const http = require('http')
const server = http.createServer(app)

//conectamos el server con la webSocket
const socket = require('socket.io')
const io = socket(server, {
  cors: {
    origin: config.cors,
    methods: ['GET', 'POST'],
  },
})

//inicializamos socket.io
io.on('connection', (socket) => {
  socket.on('conectado', (user) => {})

  socket.on('join', ({ chatId /* userId */ }) => {
    if (!chatId) console.log('No hay chatId')

    console.log('Usuario conectado al chat: ', chatId)
    // Uno al usuario al chat
    socket.join(chatId)
    // TODO: Agregar al usuario de la lista de conectados
  })

  socket.on('leave', ({ chatId /* userId */ }) => {
    socket.leave(chatId)
    // TODO: Eliminar al usuario de la lista de conectados
  })

  socket.on('typing', ({ fullName, chatId }) => {
    // Si data es false significa que el usuario no esta escribiendo, devuelve un string vacio
    socket.to(chatId).emit('typing', `${fullName} is typing...`)
  })

  socket.on('message', ({ chatId, ...data }) => {
    console.log('hOLA YO SOY EL SERVIDOR')
    // Enviamos el mensaje a todos los usuarios conectados, incluido el que lo envia
    socket.to(chatId).emit('new-message', data)
  })
  console.log('usuario conectado')
})

module.exports = server
