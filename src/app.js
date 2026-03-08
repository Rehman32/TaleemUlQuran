require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const connectDB = require('./config/db');
const pageRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Google site verification
app.get('/google0e250588723b6647.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'google0e250588723b6647.html'));
});

// Sitemap
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'sitemap.xml'));
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'robots.txt'));
});

// Routes
app.use('/', pageRoutes);
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('index', {
    title: 'Page Not Found — Taleem Ul Quran',
    description: 'The page you are looking for does not exist.',
    active: 'home'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

module.exports = app;
