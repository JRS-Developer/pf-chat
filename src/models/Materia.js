const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// const unique = require('mongoose-unique-validator');

const MateriaSchema = new Schema(
  {
    materia: {
      type: String,
      required: [true, 'materia_id is required'],
      unique: true,
    },
    clase: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Clases',
        }
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
);

MateriaSchema.plugin(unique);

// MateriaSchema.virtual('id').get(() => {
//   return this._id.toHexString()
// });

// MateriaSchema.set('toJSON', {
//   virtuals: true
// });

// function arrayLimit (val) {
//   return val.length >= 1;
// };
module.exports = model('Materia', MateriaSchema)