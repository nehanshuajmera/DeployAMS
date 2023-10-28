const AcademicCalendar = require("../Model/calanderSchema"); // Import your AcademicCalendar model
const Subject = require("../Model/subjectSchema"); // Import your Subject model

async function isClassDay(dateToCheck) {
    try {
        // Check if the date is a holiday in the academic calendar
        const academicCalendarEntry = await AcademicCalendar.findOne({
            date: dateToCheck,
            holiday: { $exists: false },
        });

        if (academicCalendarEntry) {
            // The date is not a holiday, check if there's a class for the date
            const todayDay = getDayOfWeek(dateToCheck);
            const subject = await Subject.findOne({
                "day": todayDay,
                "date": { $in: [dateToCheck] },
            });

            if (subject) {
                return true; // There's a class scheduled for the date
            }
        }

        return false; // The date is either a holiday or no class is scheduled
    } catch (error) {
        console.error("Error checking if the date is a class day:", error);
        return false; // Assume no class on error
    }
}

// Function to get the day of the week (e.g., "Monday")
function getDayOfWeek(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
}

// Usage example
// const dateToCheck = new Date("2023-10-31"); // Replace with the date you want to check
// isClassDay(dateToCheck).then(result => {
//     if (result) {
//         console.log("It's a class day.");
//     } else {
//         console.log("It's either a holiday or no class is scheduled.");
//     }
// });

module.exports = isClassDay;