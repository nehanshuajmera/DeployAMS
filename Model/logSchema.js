const mongoose = require('mongoose');

// Define the Log schema
const logSchema = new mongoose.Schema({
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  createdBy: String, // You can specify the user who created the log
});

// Create a Log model
const Log = mongoose.model('Log', logSchema);
module.exports = Log;