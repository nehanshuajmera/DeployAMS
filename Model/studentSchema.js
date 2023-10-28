const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  enrollment_no: String,
  scholar_no: String,
  email: {
    type: String,
    match: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  },
  phone_no: String,
  branch: String,
  section: String,
  batch: String,
  password: String, // You should encrypt this before saving it
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at_and_by: {
    admin: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  subjects: [
    {
      subject_id: mongoose.Schema.Types.ObjectId,
      attendance: [
        {
          date: Date,
          cause: String,
        },
      ],
    },
  ],
});

// Create a Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
