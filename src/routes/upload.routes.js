const express = require('express');
const router = express.Router();
const imagen = require('../utils');
const {
    uploadFile, 
    getFiles
} = require('../controllers/upload.controller');
const file = require('../utils/multer');

router.get('/', getFiles);

router.post('/', file, uploadFile);


module.exports = router