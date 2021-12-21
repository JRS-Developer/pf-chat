const mongoose = require('mongoose')
const { Schema, model } = mongoose

const MessageSchema = new Schema({
  
  chat_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Chat', 
    required: [true, "chat_id is required"],
  },
  user_id: {
    type: String,
    required: [true, "user_id is required"],
  },
  message:  {
    type: Object,
    required: [true, "message is required"],
    maxlength: [100, "fullname mustn't exceed 100 characters"],
  },
  parent_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Message'
  },
  likes: {
    type: Object,   
  }

})


module.exports = model('Message', MessageSchema)
