const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);
