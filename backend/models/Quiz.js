// models/Quiz.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true }   // student must type this out
}, { _id: false });

const quizSchema = new mongoose.Schema({
  lectureId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lecture', 
    required: true 
  },
  questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
