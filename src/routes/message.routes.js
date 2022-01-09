const express = require('express')
const router = express.Router()
const {
  get_msgByChat,
  createMsg,
  updateMessage,
  deleteMessage,
} = require('../controllers/message.controller')

router.get('/:chat', get_msgByChat)
router.post('/', createMsg)
router.put('/:id', updateMessage)
router.put('/:id', deleteMessage)

module.exports = router
