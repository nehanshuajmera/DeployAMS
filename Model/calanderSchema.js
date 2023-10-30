const mongoose = require("mongoose");

const academicCalendarSchema = new mongoose.Schema({
  date: Date, // The date of the event or holiday
  day: String, // The day of the week (e.g., "Monday")
  holiday: String, // The name or description of the holiday or event
});

const AcademicCalendar = mongoose.model("AcademicCalendar", academicCalendarSchema);

module.exports = AcademicCalendar;
