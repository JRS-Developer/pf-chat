const mongoose = require('mongoose')
const { Schema, model } = mongoose

const PrivateChatsSchema = new Schema({
  members: {
      type: Array,
      required: true,
  }
})

module.exports = model('PrivateChats', PrivateChatsSchema)