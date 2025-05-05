require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 3000;
const SUBSCRIBERS_FILE = path.join(__dirname, '../data/subscribers.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.join(__dirname, '../data');
  try {
    await fs.access(dataDir);
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify([]));
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Get subscribers
const getSubscribers = async () => {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Save subscribers
const saveSubscribers = async (subscribers) => {
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
};

// API Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // Get current subscribers
    const subscribers = await getSubscribers();
    
    // Check if email is already registered
    if (subscribers.includes(email)) {
      return res.status(409).json({ error: 'Email is already registered' });
    }
    
    // Add new subscriber
    subscribers.push(email);
    await saveSubscribers(subscribers);
    
    return res.status(200).json({ message: 'Successfully registered' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Serve the frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
(async () => {
  await ensureDataDir();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();