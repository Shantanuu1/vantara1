require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vantaraDB';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => { console.error('❌ MongoDB error:', err.message); process.exit(1); });

// Model
const Contact = require('./models/Contact');

// Test route
app.get('/health', (req, res) => res.json({ ok: true }));

// Save contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { request, name, email, phone, message } = req.body;
    if (!request || !name || !email) {
      return res.status(400).json({ success: false, message: 'request, name, and email are required.' });
    }
    const doc = await Contact.create({ request, name, email, phone, message });
    res.json({ success: true, message: 'Form submitted successfully!', id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

const PORT = process.env.PORT || 5000;

// ✅ Serve everything inside "public"
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Default route → show contactus.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contactus.html'));
});

// ✅ Route for /contactus
app.get('/contactus', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contactus.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
