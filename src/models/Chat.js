const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ChatSchema = new Schema({
  description: {
    type: String,
  },
  materia_id: {
    type: String,
    required: true
  }
})

module.exports = model('Chat', ChatSchema)
