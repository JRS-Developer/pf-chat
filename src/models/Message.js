const mongoose = require('mongoose')
const { Schema, model } = mongoose

const MessageSchema = new Schema({
  chat_id: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  user_id: {
    type: String,
    required: true
  },
  text:  {
    type: String,
    required: true
  },
  images: [String],
  files: [String],
  parent_id: { type: Schema.Types.ObjectId, ref: 'Message' },
})

module.exports = model('Message', MessageSchema)
