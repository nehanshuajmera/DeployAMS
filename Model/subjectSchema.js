const mongoose = require('mongoose');

// Define the Subject schema
const subjectSchema = new mongoose.Schema({
  subject_id: mongoose.Schema.Types.ObjectId,
  subject_name: String,
  course_code: String,
  branch: String,
  section: String,
  batch: String,
  teacher_id: String,
  attendance_date: [Date], // An array of date objects
 
  // Changed Schema 
  updateAttendance:[{
    actualDate:Date,
    status:Boolean,
  }],

  extraClass:[{
    dateOfClass:Date,    
    count:Number
  }],
  
  rescheduleClass:[{
    Day:String,
    dateOfreschedule:Date
  }],

  day: [
    {
      name:String ,
      count:Number
    }
    ], // An array of strings representing days of the week (e.g., "Mon")
});

// Create a Subject model
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
