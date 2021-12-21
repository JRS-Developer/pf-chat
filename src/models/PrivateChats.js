const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const PrivateChatsSchema = new Schema({

  members: {
      type:[{
        type: String,
        unique: true,
      }],
      required: [true, "members are required"],
      validate: [arrayLimit, 'members must be exactly 2 users'],
      unique: true,
    }
})

PrivateChatsSchema.plugin(unique);

function arrayLimit (val) {
  return val.length === 2;
}

module.exports = model('PrivateChats', PrivateChatsSchema)