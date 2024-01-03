const mongoose = require('mongoose');

// Define the Subject schema
const subjectSchema = new mongoose.Schema({
  subject_name: String,
  course_code: String,
  branch: String,
  section: String,
  batch: String,
  // // Changed Schema 
  // updateAttendance:[{
  //   actualDate:Date,
  //   status:Boolean,
  // }],

  // extraClass:[{
  //   dateOfClass:Date,    
  //   count:Number
  // }],
  
  // rescheduleClass:[{
  //   Day:String,
  //   dateOfreschedule:Date
  // }],
  department: String,
  class_name: String,
  teacher_id: mongoose.Schema.Types.ObjectId, // Assuming this references the teacher
  lecture_dates: [{date: Date, count: Number}], // An array of date objects
  day:[{name: String, count: Number,cause:String}], // for backup no use
  created_at_and_by: {
    admin_name: { type: String, default: 'admin' },
    date: { type: Date, default: Date.now }
  },
  updated_at_and_by: {
    admin_name: { type: String, default: 'admin' },
    date: { type: Date, default: Date.now }
  }
});

// Create a Subject model
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
