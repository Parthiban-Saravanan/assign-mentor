const express = require('express');
const router = express.Router();
const {
  createMentor,
  getStudentsForMentor,
  assignStudentsToMentor,
  changeMentorForStudent,
  getPreviousMentorsForStudent
} = require('../controllers/mentorController');

router.post('/', createMentor);
router.get('/:mentorId/students', getStudentsForMentor);
router.post('/:mentorId/assign-students', assignStudentsToMentor);
router.put('/change-mentor/:studentId', changeMentorForStudent);
router.get('/previous-mentors/:studentId', getPreviousMentorsForStudent);

module.exports = router;
