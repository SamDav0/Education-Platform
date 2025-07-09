const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
