const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const Registration = require('../models/Registration');

// Middleware to check DB connection
function requireDB(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. Please try again in a moment or contact us via WhatsApp.'
    });
  }
  next();
}

// POST /api/contact
router.post('/contact', requireDB, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    await contact.save();
    res.json({ success: true, message: 'Thank you! We will get back to you soon.' });
  } catch (err) {
    console.error('Contact save error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

// POST /api/register
router.post('/register', requireDB, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('gender').isIn(['Male', 'Female']).withMessage('Please select a gender'),
  body('course').trim().notEmpty().withMessage('Please select a course'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('email').trim().isEmail().withMessage('Valid email is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const registration = new Registration({
      name: req.body.name,
      guardianName: req.body.guardianName,
      gender: req.body.gender,
      age: req.body.age ? parseInt(req.body.age) : undefined,
      course: req.body.course,
      phone: req.body.phone,
      country: req.body.country,
      email: req.body.email,
      message: req.body.message
    });
    await registration.save();
    res.json({ success: true, message: 'Registration successful! Our team will contact you shortly.' });
  } catch (err) {
    console.error('Registration save error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

module.exports = router;
