const express = require('express');
const router = express.Router();
const Log = require('../Model/logSchema'); // Import your Log model

// GET /logs - Retrieve all log entries
router.get('/logs', async (req, res) => {
  try {
    // Find all log entries
    const logs = await Log.find();

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: 'No log entries found' });
    }

    return res.status(200).json({ logs });
  } catch (error) {
    console.error('Error fetching log entries:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
