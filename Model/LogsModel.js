const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  ip: { type: String, required: false },
  what: { type: String, required: true },
  created_at:{ type: String, required: true },
});

const Logs = mongoose.model("log", logsSchema);

module.exports = Logs;