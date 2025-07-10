const Student=require("../models/Student")
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, 'name year');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};
