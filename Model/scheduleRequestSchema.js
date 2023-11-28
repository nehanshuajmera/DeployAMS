const mongoose = require('mongoose');

const scheduleRequestSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', // Reference to the teacher who made the request
  },
  subject :{
    type :mongoose.Schema.Types.ObjectId,
    ref:'Subject',
  },
  proposedDateTime: Date,
  actualDateTime:Date,
  reason:String,
  typeOfRequest:{
    type:String,
    enum:['update','reschedule','extra'] // This are the kind of request which a teacher can request  
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  adminComment: String, // Optional comment from the admin
}, { timestamps: true });

const scheduleRequest = mongoose.model('RescheduleRequest', scheduleRequestSchema);

module.exports = scheduleRequest;
