const AcademicCalendar = require("../Model/calanderSchema"); // Import your AcademicCalendar model
const Subject = require("../Model/subjectSchema"); // Import your Subject model

// Function to get the day of the week (e.g., "Monday")
function getDayOfWeek(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
  }
  
  // Function to check if a class is scheduled for a specific date and subject
  async function isClassScheduled(date, subjectId) {
    try {
      // Check if the provided date is not a holiday in the academic calendar
      const academicCalendarEntry = await AcademicCalendar.findOne({
        date: date,
        holiday: { $exists: false },
      });
  
      if (academicCalendarEntry) {
        // Check if the subject with the given subjectId has a class scheduled for the provided date
        const subject = await Subject.findOne({
          _id: subjectId,
          day: getDayOfWeek(date),
        });
  
        if (subject) {
          return true; // The subject has a class scheduled for the provided date
        }
      }
  
      return false; // Either it's a holiday or no class is scheduled for that date and subject
    } catch (error) {
      console.error("Error checking if the class is scheduled:", error);
      return false; // Assume no class on error
    }
  }
  
  module.exports = isClassScheduled;