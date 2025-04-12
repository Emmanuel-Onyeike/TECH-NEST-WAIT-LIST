const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const dataPath = path.join(__dirname, 'waitlist.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle form submission
app.post('/join', (req, res) => {
  const email = req.body.email;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  // Read current waitlist
  let waitlist = [];
  if (fs.existsSync(dataPath)) {
    waitlist = JSON.parse(fs.readFileSync(dataPath));
  }

  // Check if email already exists
  const exists = waitlist.find((user) => user.email === email);
  if (exists) return res.status(409).json({ error: 'Email already on waitlist' });

  const newUser = {
    email,
    waitlistNumber: waitlist.length + 1
  };

  waitlist.push(newUser);
  fs.writeFileSync(dataPath, JSON.stringify(waitlist, null, 2));

  res.status(200).json({ message: 'Added to waitlist', waitlistNumber: newUser.waitlistNumber });
});

// Admin dashboard endpoint
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dashboard.html'));
});

app.get('/api/waitlist', (req, res) => {
  if (!fs.existsSync(dataPath)) return res.json([]);
  const waitlist = JSON.parse(fs.readFileSync(dataPath));
  res.json(waitlist);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});