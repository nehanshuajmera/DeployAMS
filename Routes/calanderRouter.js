const express = require("express");
const router = express.Router();
const AcademicCalendar = require("../Model/calanderSchema"); // Import your AcademicCalendar model

// POST /create-academic-calendar - Create academic calendar entries for a date range
router.post("/create-academic-calendar", async (req, res) => {
  try {
    // Get the start date and end date from the request
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }

    // Calculate the date range
    const dateRange = createDateRange(startDate, endDate);

    // Create academic calendar entries with date and day, leaving "holiday" unassigned
    const academicCalendarEntries = dateRange.map(date => ({
      date: date,
      day: getDayOfWeek(date),
    }));

    // Insert the academic calendar entries into the database
    await AcademicCalendar.insertMany(academicCalendarEntries);

    return res.status(201).json({ message: "Academic calendar entries created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Function to create a date range between two dates
function createDateRange(startDate, endDate) {
  const dateRange = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
}

// Function to get the day of the week (e.g., "Monday")
function getDayOfWeek(date) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getDay()];
}

module.exports = router;
