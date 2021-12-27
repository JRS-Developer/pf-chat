const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const RoleSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, 'role_id is required'],
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [100, "description mustn't exceed 100 characters"],
    },
  },
  {
    versionKey: false,
  }
);

RoleSchema.plugin(unique);

// RoleSchema.virtual('id').get(() => {
//   return this._id.toHexString()
// });

// RoleSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = model('Roles', RoleSchema);