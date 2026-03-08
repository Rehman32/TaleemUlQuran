const express = require('express');
const router = express.Router();

// Page meta data for SEO
const pages = {
  home: {
    title: 'Taleem Ul Quran — Online Quran Academy | Learn Quran Online',
    description: 'Join Taleem Ul Quran Online Quran Academy for personalized Quranic education. Expert male & female tutors, flexible timings, affordable fees. Free trial available for students worldwide.',
    active: 'home'
  },
  courses: {
    title: 'Our Courses — Taleem Ul Quran Online Quran Academy',
    description: 'Explore our comprehensive online Quran courses: Noorani Qaida, Quran Reading, Tajweed, Translation, Memorization (Hifz), and Key Surahs. Expert tutors for all ages.',
    active: 'courses'
  },
  about: {
    title: 'About Us — Taleem Ul Quran Online Quran Academy',
    description: 'Learn about Taleem Ul Quran Academy, founded in 2012 by Maulana Umar Qayoom. Providing quality Quranic education worldwide with certified male and female instructors.',
    active: 'about'
  },
  contact: {
    title: 'Contact Us — Taleem Ul Quran Online Quran Academy',
    description: 'Get in touch with Taleem Ul Quran Online Quran Academy. Reach us via phone, WhatsApp, or email. We respond promptly to all inquiries.',
    active: 'contact'
  },
  register: {
    title: 'Register Now — Free Trial | Taleem Ul Quran Online Quran Academy',
    description: 'Register for a free 3-day trial at Taleem Ul Quran Online Quran Academy. Start your Quranic learning journey today with expert tutors.',
    active: 'register'
  },
  pricing: {
    title: 'Pricing & Packages — Taleem Ul Quran Online Quran Academy',
    description: 'Affordable Quran learning packages: Weekend, Standard, and Professional plans. Flexible schedules with male and female tutors. Family discounts available.',
    active: 'pricing'
  },
  whyUs: {
    title: 'Why Choose Us — Taleem Ul Quran Online Quran Academy',
    description: 'Discover why thousands choose Taleem Ul Quran: flexible timing, qualified staff, individual sessions, female tutors, any device access, and affordable fees.',
    active: 'why-us'
  },
  resources: {
    title: 'Resources & Downloads — Taleem Ul Quran Online Quran Academy',
    description: 'Download free Islamic resources including Masnoon Duas and Quran PDFs from Taleem Ul Quran Online Quran Academy.',
    active: 'resources'
  }
};

router.get('/', (req, res) => {
  res.render('index', pages.home);
});

router.get('/courses', (req, res) => {
  res.render('courses', pages.courses);
});

router.get('/about', (req, res) => {
  res.render('about', pages.about);
});

// Legacy URL redirects
router.get('/aboutus', (req, res) => res.redirect(301, '/about'));
router.get('/contactus', (req, res) => res.redirect(301, '/contact'));
router.get('/whyus', (req, res) => res.redirect(301, '/why-us'));
router.get('/package', (req, res) => res.redirect(301, '/pricing'));
router.get('/downloads', (req, res) => res.redirect(301, '/resources'));

router.get('/contact', (req, res) => {
  res.render('contact', pages.contact);
});

router.get('/register', (req, res) => {
  res.render('register', pages.register);
});

router.get('/pricing', (req, res) => {
  res.render('pricing', pages.pricing);
});

router.get('/why-us', (req, res) => {
  res.render('why-us', pages.whyUs);
});

router.get('/resources', (req, res) => {
  res.render('resources', pages.resources);
});

module.exports = router;
