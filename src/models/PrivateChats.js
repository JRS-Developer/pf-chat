const mongoose = require('mongoose')
const { Schema, model } = mongoose

const PrivateChatsSchema = new Schema({
  members: {
      type: Object,
      require: true
  }
})

module.exports = model('PrivateChats', PrivateChatsSchema)