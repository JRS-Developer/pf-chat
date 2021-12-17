const express = require('express');
const router = express.Router();
const chat = require('./chat.routes');
const messages = require('./message.routes');
const privates = require('./privateChats.routes')

router.use('/chat', chat);
router.use('/messages', messages);
router.use('/privates', privates);

module.exports = router
