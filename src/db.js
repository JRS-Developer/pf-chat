const mongoose = require('mongoose')
const { dbURI } = require('./lib/config')

const connect = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('DB connected! :D')
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  connect
}
