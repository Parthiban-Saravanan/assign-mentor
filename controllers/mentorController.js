const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create a new mentor
exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students for a particular mentor
exports.getStudentsForMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('students');
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.json(mentor.students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign students to a mentor
exports.assignStudentsToMentor = async (req, res) => {
  try {
    const { studentIds } = req.body;
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const students = await Student.find({ _id: { $in: studentIds }, mentor: { $exists: false } });
    if (!students.length) {
      return res.status(404).json({ error: 'No students available to assign' });
    }

    students.forEach(student => {
      student.mentor = mentor._id;
      mentor.students.push(student._id);
      student.save();
    });

    await mentor.save();

    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Change mentor for a student
exports.changeMentorForStudent = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const student = await Student.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }

    student.mentor = mentorId;
    await student.save();

    const mentor = await Mentor.findById(mentorId);
    if (!mentor.students.includes(student._id)) {
      mentor.students.push(student._id);
      await mentor.save();
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get previous mentors for a student
exports.getPreviousMentorsForStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('previousMentors');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student.previousMentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
