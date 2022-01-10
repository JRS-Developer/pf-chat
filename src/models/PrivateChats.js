const mongoose = require('mongoose')
const { Schema, model } = mongoose
const unique = require('mongoose-unique-validator')

const PrivateChatsSchema = new Schema(
  {
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
          unique: true,
        },
      ],
      required: [true, 'members are required'],
      validate: [arrayLimit, 'members must be exactly 2 users'],
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

PrivateChatsSchema.plugin(unique)

function arrayLimit(val) {
  return val.length >= 2
}

// PrivateChatsSchema.virtual('id').get(() => {
//   return this._id.toHexString()
// });

// PrivateChatsSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = model('PrivateChats', PrivateChatsSchema)
