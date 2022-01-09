const express = require('express')
const router = express.Router()
const {
  get_roles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/roles.controller')

router.get('/', get_roles)
router.get('/:id', getRoleById)
router.post('/', createRole)
router.put('/:id', updateRole)
router.delete('/:id', deleteRole)

module.exports = router
