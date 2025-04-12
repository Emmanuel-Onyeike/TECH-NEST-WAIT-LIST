const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let waitlist = [];

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emmanuelonyeike33@gmail.com',
    pass: 'fpyf kjnd zdmb txyh' // Use App Password, not regular one
  }
});

app.post('/join', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const waitlistNumber = waitlist.length + 1;
  waitlist.push({ email, waitlistNumber });

  // Send confirmation email
  const mailOptions = {
    from: 'Tech-Nest <your_email@gmail.com>',
    to: email,
    subject: 'Welcome to Tech-Nest 🚀',
    html: `<h3>Welcome to Tech-Nest!</h3>
           <p>Your waitlist number is <strong>#${waitlistNumber}</strong>.</p>
           <p>We’ll keep you updated. Thanks for joining!</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.status(200).json({ message: 'Joined successfully!', waitlistNumber });
  });
});

// Route to get waitlist for admin
app.get('/api/waitlist', (req, res) => {
  res.json(waitlist);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
