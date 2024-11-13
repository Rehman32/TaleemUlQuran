const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
require('dotenv').config();

const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Commented out MySQL connection configuration and related code
/*
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// // Connect to MySQL
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL database");
// });
*/

// For serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get('/google0e250588723b6647.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'google0e250588723b6647.html'));
});
// Commented out form submission handlers
/*
app.post("/submit-contacts", (req, res) => {
  const { name, email, message } = req.body;
  const insertQuery =
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  connection.query(insertQuery, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error submitting data");
    } else {
      console.log("Data inserted successfully");
      res.redirect("/");
    }
  });
});

app.post("/submit-registration", (req, res) => {
  const {
    name,
    guardianName,
    gender,
    age,
    course,
    phone,
    country,
    email,
    message,
  } = req.body;
  const insertQuery =
    "INSERT INTO registrations (name, guardian_name, gender, age, course, phone, country, email, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    insertQuery,
    [name, guardianName, gender, age, course, phone, country, email, message],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error submitting registration");
      } else {
        console.log("Registration submitted successfully");
      }
    }
  );
});
*/

// Other routes...
app.get("/aboutus", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "aboutUs.html"));
});
app.get("/courses", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "courses.html"));
});
app.get("/whyus", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "whyus.html"));
});
app.get("/contactus", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});
app.get("/package", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "package.html"));
});
app.get("/downloads", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "downloads.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
