const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ChatSchema = new Schema({
  description: String,
  materia_id: String,
})

module.exports = model('Chat', ChatSchema)
