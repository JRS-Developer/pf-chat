const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ChatSchema = new Schema({

  description: {
    type: String,
  },
  materia_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Chat', 
    required: [true, "materia_id is required"] 
  }
})

module.exports = model('Chat', ChatSchema)
