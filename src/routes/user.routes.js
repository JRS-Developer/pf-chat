const express = require('express')
const router = express.Router()
const {
  get_users,
  getById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller')

router.get('/', get_users)
router.get('/:id', getById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.put('/:id', deleteUser)

module.exports = router
