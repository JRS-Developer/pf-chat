const express = require('express');
const router = express.Router();
const chat = require('./chat.routes');
const messages = require('./message.routes');
const privates = require('./privateChats.routes');
const upload = require('./upload.routes');
const users = require('./user.routes');
const materias = require('./materia.routes');
const roles = require('./roles.routes');
const school = require('./school.routes');
const clases = require('./clases.routes');

router.use('/chat', chat);
router.use('/messages', messages);
router.use('/privates', privates);
router.use('/upload', upload);
router.use('/users', users);
router.use('/materias', materias);
router.use('/roles', roles);
router.use('/school', school);
router.use('/clases', clases);


module.exports = router
