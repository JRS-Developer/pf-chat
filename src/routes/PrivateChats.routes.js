const express = require('express')
const router = express.Router()
const {
    getPChatsByUser,
    getPChatsByMembers,
    createPChat,
} = require('../controllers/privateChats.controller');

router.get('/:sender_id', getPChatsByUser)
router.get('/:sender_id/:receiver_id', getPChatsByMembers)
router.post('/', createPChat)


module.exports = router