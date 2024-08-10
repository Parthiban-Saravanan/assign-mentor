const Student = require('../models/Student');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students without a mentor
exports.getUnassignedStudents = async (req, res) => {
  try {
    const students = await Student.find({ mentor: { $exists: false } });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
