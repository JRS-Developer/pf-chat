const express = require('express')
const router = express.Router()
const {
    get_msgByChat,
    createMsg 
} = require('../controllers/message.controller');

router.get('/:chat_id', get_msgByChat)
router.post('/', createMsg)


module.exports = router