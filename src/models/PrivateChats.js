const mongoose = require('mongoose')
const { Schema, model } = mongoose

const PrivateChatsSchema = new Schema({
  
  members: {
      type: Array,
  }
})

module.exports = model('PrivateChats', PrivateChatsSchema)