const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const SchoolSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, "school_id is required"],
      unique: true,
    },
    nombre: {
      type: String,
      required: [true, 'name is required'],
      maxlength: [50, "name mustn't exceed 100 characters"],
      minlength: [10, 'name must have to containt 10 minimun characters'],
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

SchoolSchema.plugin(unique);

// SchoolSchema.virtual('id').get(() => {
//   return this._id.toHexString()
// });

// SchoolSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = model('School', SchoolSchema);