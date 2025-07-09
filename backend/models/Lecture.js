const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  notesUrl: { type: String, required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
}, { timestamps: true });

module.exports = mongoose.model('Lecture', lectureSchema);
