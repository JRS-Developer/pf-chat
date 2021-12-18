const express = require('express');
const router = express.Router();
const chat = require('./chat.routes');
const messages = require('./message.routes');
const privates = require('./privateChats.routes');
const upload = require('./upload.routes');

router.use('/chat', chat);
router.use('/messages', messages);
router.use('/privates', privates);
router.use('/upload', upload);

module.exports = router
