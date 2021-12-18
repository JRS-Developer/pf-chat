const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const PrivateChatsSchema = new Schema({

  members: {
      type:[{
        type: String,
        unique: true,
        required: true
      }],
      required: [true, "members are required"],
      validate: [arrayLimit, 'members exceeds the limit of 2 on private chat'],
      unique: true,
    }
})

PrivateChatsSchema.plugin(unique);

const arrayLimit = (val) => {
  return val.length <= 2;
}

module.exports = model('PrivateChats', PrivateChatsSchema)