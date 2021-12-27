const express = require('express')
const router = express.Router()
const { getChats, createChat, upDateChat, getChatByclase, deleteChat, updateParticipants} = require('../controllers/chat.controller');


router.get('/', getChats);
router.get('/:materia/:clase/:id', getChatByclase);
router.post('/', createChat);
router.put('/:id', upDateChat);
router.put('/participants/:id', updateParticipants)
router.delete('/:id', deleteChat);

module.exports = router