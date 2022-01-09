const mongoose = require('mongoose')
const { Schema, model } = mongoose
const unique = require('mongoose-unique-validator')

const UserSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, 'user_id is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'please put a valid username format'],
      required: [true, 'email is required'],
      unique: true,
    },
    fullname: {
      type: String,
      required: [true, 'fullname is required'],
      maxlength: [100, "fullname mustn't exceed 100 characters"],
      minlength: [10, 'fullname must containt minimum 10 characters'],
      unique: true,
    },
    rol: {
      type: Schema.Types.ObjectId,
      ref: 'Roles',
      required: [true, 'rol_id is required'],
    },
    avatar: {
      type: String,
      maxlength: [100, "avatar mustn't exceed 100 characters"],
    },
    state: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
)

UserSchema.plugin(unique)
UserSchema.path('avatar').validate((val) => {
  const urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

  if (urlRegex.test(path));
}, 'Invalid URL.')

function arrayLimit(val) {
  return val.length > 0
}

// UserSchema.virtual('id').get(() => {
//   return this._id.toHexString()
// });

// UserSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = model('User', UserSchema)
