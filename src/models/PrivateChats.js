const mongoose = require('mongoose')
const { Schema, model } = mongoose

const PrivateChatsSchema = new Schema({

  members: {
      type: Array,
      required: [true, "members are required"],
      length: {
        $lt: 2
      },
      // maxlength: [2, "A private chat just can have 2 characters"],
      // minlength: [2, "A private chat just can have 2 characters"],
  }
})

module.exports = model('PrivateChats', PrivateChatsSchema)