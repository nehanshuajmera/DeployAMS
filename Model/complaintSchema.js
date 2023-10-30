const mongoose = require('mongoose');

// Define the Complaint schema
const complaintSchema = new mongoose.Schema({
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', // Reference to the Teacher model (assuming you have a Teacher model)
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model (assuming you have a Student model)
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create a Complaint model
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
