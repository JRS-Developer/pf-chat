const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({

  user_id: {
    type: String,
    required: [true, "user_id is required"],
  },
  chat_id: {
    type: Array,
  },
  username: {
    type: String,
    required: [true, "username is required"],
    match: [/.+\@.+\..+/, 'please put a valid username format']
  },
  fullname: {
    type: String,
    required: [true, "fullname is required"],
    maxlength: [100, "fullname mustn't exceed 100 characters"],
    minlength: [10, "fullname must containt minimum 10 characters"]
  },
  description: {
    type: String,
  },
  avatar: {
      type: String,
  }
});

module.exports = model('User', UserSchema);