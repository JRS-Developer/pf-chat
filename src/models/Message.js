const mongoose = require('mongoose')
const { Schema, model } = mongoose

const MessageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'chat_id is required'],
    },
    user: {
      type: String,
      required: [true, 'user_id is required'],
    },
    message: {
      type: String,
      required: [true, 'message is required'],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    likes: {
      type: Object,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// MessageSchema.virtual('id').get(() => {
//   return this._id.toHexString()
// });

// MessageSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = model('Message', MessageSchema)
