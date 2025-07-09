const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  years: [{ type: Number }], // List of classes teacher teaches
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
