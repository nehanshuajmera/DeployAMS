const mongoose = require('mongoose');

// Define the Subject schema
const subjectSchema = new mongoose.Schema({
  subject_id: mongoose.Schema.Types.ObjectId,
  subject_name: String,
  course_code: String,
  branch: String,
  section: String,
  batch: String,
  count:Number,
  teacher_id: String,
  attendance_date: [Date], // An array of date objects
  day: [String], // An array of strings representing days of the week (e.g., "Mon")
});

// Create a Subject model
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
