const mongoose = require("mongoose");

const academicCalendarSchema = new mongoose.Schema({
  date: Date, // The date of the event or holiday
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  holiday: Boolean, 
  event: String, // The event or holiday
});

const AcademicCalendar = mongoose.model("AcademicCalendar", academicCalendarSchema);

module.exports = AcademicCalendar;
