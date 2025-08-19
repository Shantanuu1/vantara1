const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  request: { type: String, enum: ['elephant', 'wild-animal', 'general', 'career'], required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Contact', ContactSchema);
