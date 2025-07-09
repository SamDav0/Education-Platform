const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  submittedAnswer: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
}, { _id: false });

const quizScoreSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  answers: [answerSchema],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizScore', quizScoreSchema);
