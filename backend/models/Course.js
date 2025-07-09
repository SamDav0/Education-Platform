const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true }, // students of this year can view this course
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
