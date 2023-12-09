const mongoose = require('mongoose');

// Define the LeaveTeacherAttendance schema
const leaveTeacherAttendanceSchema = new mongoose.Schema({
  teacherId: mongoose.Schema.Types.ObjectId,
  subjectId: String,
  assign_teacherId: mongoose.Schema.Types.ObjectId,
  leaveDate: Date,
  status: String,
  attendance : [{
    studentId: mongoose.Schema.Types.ObjectId,
    count: Number,
    status: String,
  }],
  created_at: { type: Date, default: Date.now },
});

// Create a LeaveTeacherAttendance model
const LeaveTeacherAttendance = mongoose.model('LeaveTeacherAttendance', leaveTeacherAttendanceSchema);
module.exports = LeaveTeacherAttendance;