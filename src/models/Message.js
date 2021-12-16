const mongoose = require('mongoose')
const { Schema, model } = mongoose

const MessageSchema = new Schema({
  chat_id: { type: Schema.Types.ObjectId, ref: 'Chat' },
  user_id: String,
  text: String,
  images: [String],
  files: [String],
  parent_id: { type: Schema.Types.ObjectId, ref: 'Message' },
})

module.exports = model('Message', MessageSchema)
