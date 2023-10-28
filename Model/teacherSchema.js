const mongoose = require('mongoose');

// Define the Teacher schema
const teacherSchema = new mongoose.Schema({
  teacher_id: String,
  name: String,
  email: {
    type: String,
    match: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  },
  phone_no: String,
  subjects: [
    {
      subject_id: mongoose.Schema.Types.ObjectId,
      permission: {
        type: String,
        enum: ['read', 'write'],
      },
    },
  ],
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
});

// Create a Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
