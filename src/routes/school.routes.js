const express = require('express');
const router = express.Router();
const { 
    get_school,
    getSchoolById,
    createSchool,
    updateSchool,
    deleteSchool
} = require('../controllers/school.controller');


router.get('/', get_school);
router.get('/:id', getSchoolById);
router.post('/', createSchool);
router.put('/:school_id', updateSchool);
router.delete('/:id', deleteSchool);

module.exports = router;