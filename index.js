const app = require('./src/app')
const { port } = require('./src/lib/config')
const {port_io} = require('./src/lib/config');
const { connect } = require('./src/db')
const server = require('./src/socket.io')


connect().then(() => {
  app.listen(port, async () => {
    console.log(`The server is running on port ${port}`)
  })
})

//dejamos escuchando el server de socket.io en un puerto especifico
server.listen(port_io, async () => {
  console.log(`The server is running on port ${port_io}`)
})

