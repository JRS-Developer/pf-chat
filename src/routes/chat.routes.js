const express = require('express')
const router = express.Router()
const {
  getChats,
  createChat,
  upDateChat,
  getChatByclase,
  deleteChat,
  updateParticipants,
} = require('../controllers/chat.controller')

router.get('/', getChats)
// router.get('/:materia/:clase/:id', getChatByclase);
router.get('/clase', getChatByclase) // Es mejor mandarlos por query, para no tener problemas de orden al mandar los parametros, y asi evitar problemas en el front de confusion
router.post('/', createChat)
router.put('/:id', upDateChat)
router.put('/participants/:id', updateParticipants)
router.delete('/:id', deleteChat)

module.exports = router
