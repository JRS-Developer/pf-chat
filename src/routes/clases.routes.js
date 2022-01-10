const express = require('express')
const router = express.Router()
const {
  getClases,
  getClaseById,
  createClase,
  updateClase,
  deleteClase,
} = require('../controllers/clases.controller')

router.get('/', getClases)
router.get('/:id', getClaseById)
router.post('/', createClase)
router.put('/:id', updateClase)
router.delete('/:id', deleteClase)

module.exports = router
