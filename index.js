const app = require('./src/app')
const { port } = require('./src/lib/config')
const { connect } = require('./src/db')

connect().then(() => {
  app.listen(port, async () => {
    console.log(`The server is running on port ${port}`)
  })
})
