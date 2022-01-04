const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const ChatSchema = new Schema(
  {
    description: {
      type: String,
      maxlength: [100, "description mustn't exceed 100 characters"],
    },
    clase: {
      type: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Materia',
        },
        {
            type: Schema.Types.ObjectId,
            ref: 'Clase',
        },
        {
            type: Schema.Types.ObjectId,
            ref: 'School',
        }
      ],
      validate: [arrayLimit, 'chat have to have school, clase and materia id'] 
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

function arrayLimit (val) {
  return val.length === 3;
};

// ChatSchema.virtual('id').get(() => {
//   return this._id.toString()
// });

// ChatSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = model('Chat', ChatSchema);
