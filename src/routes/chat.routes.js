const express = require('express')
const router = express.Router()
const { getChats, createChat, upDateChat, getChatById} = require('../controllers/chat.controller');


router.get('/', getChats);
router.get('/:materia_id', getChatById);
router.post('/', createChat);
router.put('/:chat_id', upDateChat);

module.exports = router