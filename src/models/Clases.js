const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ClaseSchema = new Schema(
  {
    clase: {
      type: String,
      required: [true, 'class_id is required'],
    },
    school: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'School',
          required: [true, 'school_id is required'],
        },
      ],
    },
    nombre: {
      type: String,
      required: [true, 'nombre is required'],
      maxlength: [50, "nombre mustn't exceed 100 characters"],
      minlength: [5, 'nombre must have to containt 10 minimun characters'],
    },
    description: {
      type: String,
      maxlength: [100, "description mustn't exceed 100 characters"],
    },
  },
  {
    versionKey: false,
  }
)

// ClaseSchema.virtual('id').get(() => {
//   return this._id.toHexString()
// });

// ClaseSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = model('Clases', ClaseSchema)
