const express = require('express')
const router = express.Router()
const {
    getPChatsByUser,
    getPChatsByMembers,
    createPChat,
    updatePChat,
    deletePChat
} = require('../controllers/privateChats.controller');

router.get('/:sender', getPChatsByUser)
router.get('/:sender/:receiver', getPChatsByMembers)
router.post('/', createPChat)
router.put('/:id', updatePChat)
router.delete('/:id', deletePChat)


module.exports = router