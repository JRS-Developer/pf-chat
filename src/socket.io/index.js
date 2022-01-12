const config = require('../lib/config')
//traemos express para poder usarlo
const app = require('../app')
//conectamos express a http para poder luego conectar al webSocket server
const http = require('http')
const server = http.createServer(app)
const onlineUsers = require('../lib/onlineUsers')

//conectamos el server con la webSocket
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: config.cors,
    methods: ['GET', 'POST'],
  },
})

function disconnect(socket) {
  const copy = { ...onlineUsers }

  delete onlineUsers[socket.id]

  socket.broadcast.emit('offline', copy[socket.id])
}

//inicializamos socket.io
io.on('connection', (socket) => {
  // Se usa go-online para agregar al usuario a la lista de usuarios online, y se usa disconnect para eliminarlo
  socket.on('go-online', (userId) => {
    onlineUsers[socket.id] = userId
    socket.broadcast.emit('online', userId)
  })

  socket.on('go-offline', (userId) => {
    const copy = { ...onlineUsers }

    const user = Object.keys(onlineUsers).filter(
      (key) => onlineUsers[key] === userId
    )[0]

    delete onlineUsers[user]

    socket.broadcast.emit('offline', copy[socket.id])
  })

  socket.on('disconnect', () => {
    disconnect(socket)
  })

  // Se usa join para agregar el usuario a la sala, y se usa leave para eliminarlo
  socket.on('join', ({ chatId /* userId */ }) => {
    if (!chatId) console.error('No hay chatId')
    // Uno al usuario al chat
    socket.join(chatId)
  })

  socket.on('leave', ({ chatId /* userId */ }) => {
    socket.leave(chatId)
  })

  socket.on('typing', ({ fullName, chatId }) => {
    // Si data es false significa que el usuario no esta escribiendo, devuelve un string vacio
    socket.to(chatId).emit('typing', `${fullName} está escribiendo...`)
  })

  socket.on('message', ({ chatId, ...data }) => {
    // Enviamos el mensaje a todos los usuarios conectados, incluido el que lo envia
    socket.to(chatId).emit('new-message', data)
  })
})

module.exports = server
