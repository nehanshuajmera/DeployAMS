const AcademicCalendar = require("../Model/calanderSchema"); // Import your AcademicCalendar model
const Subject = require("../Model/subjectSchema"); // Import your Subject model


// Function to check if a class is scheduled for a specific date and subject
async function isClassScheduled(date, subjectId) {
    try {
      // Check if the provided date is not a holiday in the academic calendar
      const academicCalendarEntry = await AcademicCalendar.findOne({
        date: new Date(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()),
        holiday: { $exists: false },
      });
//  console.log({academicCalendarEntry}, new Date(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())) 

if (academicCalendarEntry) {
        // Check if the subject with the given subjectId has a class scheduled for the provided date
        const subject = await Subject.findOne({
          _id: subjectId,
          // day: getDayOfWeek(date),
        });
 
        // console.log(subject.day,subject.day.find(getDayOfWeek(date)))
        
        if (subject) {
          // console.log(getDayOfWeek(date))
          var isday= subject.day.find(day => day.name === getDayOfWeek(date));

          return !(!isday); // The subject has a class scheduled for the provided date
        }
      }
  
      return false; // Either it's a holiday or no class is scheduled for that date and subject
    } catch (error) {
      console.error("Error checking if the class is scheduled:", error);
      return false; // Assume no class on error
    }
  }
  

  // Function to get the day of the week (e.g., "Monday")
function getDayOfWeek(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
 }

  module.exports = isClassScheduled;