const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const ClaseSchema = new Schema(
  {
    Class_idP: {
      type: String,
      required: [true, 'class_id is required'],
      unique: true,
    },
    school_id: {
      type: Schema.Types.ObjectId,
      ref: 'School',
      required: [true, 'class_id is required'],
      unique: true,
    },
    name: {
      Type: String,
      required: [true, 'clase name is required'],
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

module.exports = model('Clases', ClaseSchema);