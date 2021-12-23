const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const ChatSchema = new Schema(
  {
    description: {
      type: String,
      maxlength: [100, "description mustn't exceed 100 characters"],
    },
    materia_id: {
      type: Schema.Types.ObjectId,
      ref: 'Materia',
      required: [true, 'materia_id is required'],
      unique: true,
    },
    participants: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ChatSchema.plugin(unique);

module.exports = model('Chat', ChatSchema);
