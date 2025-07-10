const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ---------------------------
// 🎓 Register Student
// ---------------------------
exports.registerStudent = async (req, res) => {
  try {
    const { username, password, name, year } = req.body;
    console.log(req.user)
    const existing = await Student.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ username, password: hashedPassword, name, year });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------------
// 👨‍👩‍👧 Register Parent
// ---------------------------
exports.registerParent = async (req, res) => {
  try {
    const { username, password, name, children } = req.body;

    const existing = await Parent.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Parent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const parent = new Parent({ username, password: hashedPassword, name, children });
    await parent.save();

    res.status(201).json({ message: 'Parent registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------------
// 👩‍🏫 Register Teacher
// ---------------------------
exports.registerTeacher = async (req, res) => {
  try {
    const { username, password, name, years } = req.body;

    const existing = await Teacher.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Teacher already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ username, password: hashedPassword, name, years });
    await teacher.save();

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------------
// 🛡 Register Admin
// ---------------------------
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword, name });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  let Model;
  switch (role) {
    case 'student': Model = Student; break;
    case 'parent': Model = Parent; break;
    case 'teacher': Model = Teacher; break;
    case 'admin': Model = Admin; break;
    default:
      return res.status(400).json({ message: 'Invalid role' });
  }

  const user = await Model.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

  const token = generateToken(user._id, role);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  res.json({ message: 'Login successful', token, userId: user._id, role });
};

exports.getUserInfo = async (req, res) => {
  try {
    // req.user is set by protect middleware
    res.status(200).json({
      userId: req.user.id,
      role: req.user.role
    });
  } catch (err) {
    res.status(401).json({ message: 'Not authenticated' });
  }
};