const mongoose = require('mongoose')
const { Schema, model } = mongoose

const MateriaSchema = new Schema({
  
  materia_id: { 
    type: String,  
    required: [true, "materia_id is required"],
  },
  name:  {
    type: String,
    required: [true, "name is required"],
    maxlength: [100, "name mustn't exceed 100 characters"],
    minlength: 10
  },
  description: {
    type: String,
  },

})

module.exports = model('Materia', MateriaSchema)