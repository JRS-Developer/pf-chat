const mongoose = require('mongoose')
const { Schema, model } = mongoose
const unique = require('mongoose-unique-validator')

const ChatSchema = new Schema(
  {
    description: {
      type: String,
      maxlength: [100, "description mustn't exceed 100 characters"],
    },
    // INFO: Por ahora se usara clase como array de strings que contiene materia_id, class_id, school_id y ciclo_lectivo_id, pero creo que seria mejor separar en propiedades att: Jose S
    clase: {
      // TODO: ELIMINAR ESTO SI NO SE USA
      // type: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: 'Materia',
      //   },
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: 'Clase',
      //   },
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: 'School',
      //   },
      // ],
      type: [String],
      validate: [
        arrayLimit,
        'chat need to have school, clase, ciclo and materia id',
      ],
    },
    // participants: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: 'User',
    //     },
    //   ],
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

ChatSchema.plugin(unique)

function arrayLimit(val) {
  return val.length === 4
}

// ChatSchema.virtual('id').get(() => {
//   return this._id.toString()
// });

// ChatSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = model('Chat', ChatSchema)
