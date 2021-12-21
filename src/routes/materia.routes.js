const express = require('express')
const router = express.Router()
const { 
    getMaterias,
    getMateriaById,
    createMateria,
    updateMateria,
} = require('../controllers/materia.controller');


router.get('/', getMaterias);
router.get('/:id', getMateriaById);
router.post('/', createMateria);
router.put('/:id', updateMateria);

module.exports = router