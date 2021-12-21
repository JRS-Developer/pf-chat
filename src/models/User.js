const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const UserSchema = new Schema({

  user_id: {
    type: String,
    required: [true, "user_id is required"],
    unique: true,
  },
  chat_id: {
    type: [{
      type: Schema.Types.ObjectId,
      unique: true
    }],
    required: [true, "chat_id is required"],
    validate: [arrayLimit, 'users have to belong to minimun 1 chat'],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    match: [/.+\@.+\..+/, 'please put a valid username format'],
    unique: true,
  },
  fullname: {
    type: String,
    required: [true, "fullname is required"],
    maxlength: [100, "fullname mustn't exceed 100 characters"],
    minlength: [10, "fullname must containt minimum 10 characters"],
    unique: true,
  },
  rol_id: {
    type: String,
    required: [true, "rol_id is required"],
    unique: true,
  },
  avatar: {
      type: String,
      maxlength: [100, "avatar mustn't exceed 100 characters"]
  }
});

UserSchema.plugin(unique);
UserSchema.path('avatar').validate((val) => {
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

    if(urlRegex.test(path));

}, 'Invalid URL.');

function arrayLimit(val) {
  return val.length > 0;
}

module.exports = model('User', UserSchema);