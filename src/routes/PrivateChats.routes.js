const express = require('express')
const router = express.Router()
const {
    getPChatsBySender,
    getPChatsByMembers,
    createPChat,
} = require('../controllers/privateChats.controller');

router.get('/:sender_id', getPChatsBySender)
router.get('/:sender_id/:receiver_id', getPChatsByMembers)
router.post('/', createPChat)


module.exports = router