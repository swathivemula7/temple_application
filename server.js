const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html');
require('dotenv').config(); 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500', 
}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', (req, res) => {
  let { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  if (name.length < 2 || name.length > 50) {
    return res.status(400).send('Name must be between 2 and 50 characters');
  }

  if (message.length < 5 || message.length > 1000) {
    return res.status(400).send('Message must be between 5 and 1000 characters');
  }

   // Sanitize inputs
   name = sanitizeHtml(name);
   email = sanitizeHtml(email);
   message = sanitizeHtml(message); 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: process.env.RECIPIENT_EMAIL, // Your recipient email address
    subject: 'New Contact Form Submission', // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
