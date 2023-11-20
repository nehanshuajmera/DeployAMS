const mongoose = require('mongoose');

// Define the Subject schema
const subjectSchema = new mongoose.Schema({
  subject_name: String,
  course_code: String,
  branch: String,
  section: String,
  batch: String,
  teacher_id: mongoose.Schema.Types.ObjectId, // Assuming this references the teacher
  lecture_dates: [{date: Date, count: Number}], // An array of date objects
  day:[{name: String, count: Number,cause:String}] // for backup no use
});

// Create a Subject model
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
