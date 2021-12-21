const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const unique = require('mongoose-unique-validator');

const MateriaSchema = new Schema({
  
  materia_id: { 
    type: String,  
    required: [true, "materia_id is required"],
    unique: true,
  },
  class_id: { 
    type: String,  
    required: [true, "class_id is required"],
    unique: true,
  },
  name:  {
    type: String,
    required: [true, "name is required"],
    maxlength: [50, "name mustn't exceed 100 characters"],
    minlength: [10, "name must have to containt 10 minimun characters"],
  },
  description: {
    type: String,
    maxlength: [100, "description mustn't exceed 100 characters"]
  },

})

MateriaSchema.plugin(unique)

module.exports = model('Materia', MateriaSchema)