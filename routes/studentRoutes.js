const express = require('express');
const router = express.Router();
const { createStudent, getUnassignedStudents } = require('../controllers/studentController');

router.post('/', createStudent);
router.get('/unassigned', getUnassignedStudents);

module.exports = router;
