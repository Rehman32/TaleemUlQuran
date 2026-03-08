const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  guardianName: { type: String, trim: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  age: { type: Number, min: 3, max: 120 },
  course: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
