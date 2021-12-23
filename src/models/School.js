const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const SchoolSchema = new Schema(
  {
    School_idP: {
      type: String,
      required: [true, 'class_id is required'],
      unique: true,
    },
    name: {
      Type: String,
      required: [true, 'clase name is required'],
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

ChatSchema.plugin(unique);

module.exports = model('School', SchoolSchema);