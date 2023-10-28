const express = require("express");
const router = express.Router();
const AcademicCalendar = require("../Model/calanderSchema"); // Import your AcademicCalendar model
const Teacher = require("../Model/teacherSchema");
const isauthenticated = require("../Middleware/authenticated");

// POST /create-academic-calendar - Create academic calendar entries for a date range
router.post("/create-academic-calendar",isauthenticated, async (req, res) => {
  try {
    const userId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
    }

    // Check if the user has admin privileges (admin_role is "Admin")
    const teacher = await Teacher.findById(userId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.admin_role !== "Admin") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
    }

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



// POST /updateholiday - Update academic calendar to mark a date as a holiday
router.post('/updateholiday', isauthenticated, async (req, res) => {
  try {
  const userId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
    }

    // Check if the user has admin privileges (admin_role is "Admin")
    const teacher = await Teacher.findById(userId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.admin_role !== "Admin") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
    }
    // Get the date to mark as a holiday from the request body
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: 'Date is required to update as a holiday' });
    }

    // Check if the date is not already marked as a holiday in the academic calendar
    const existingEntry = await AcademicCalendar.findOne({ date: date, holiday: { $exists: false } });

    if (existingEntry) {
      return res.status(400).json({ message: 'The date is already in the academic calendar and is not marked as a holiday' });
    }

    // Update the academic calendar to mark the date as a holiday
    await AcademicCalendar.findOneAndUpdate(
      { date: date },
      { $set: { holiday: 'Holiday' } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: 'Academic calendar updated to mark the date as a holiday' });
  } catch (error) {
    console.error('Error updating academic calendar:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// GET /academiccalendar - Retrieve all dates, days, and holidays from the academic calendar
router.get('/academiccalendar', isauthenticated, async (req, res) => {
  try {
    const userId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
    }

    // Check if the user has admin privileges (admin_role is "Admin")
    const teacher = await Teacher.findById(userId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.admin_role !== "Admin") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
    }
    // Find all entries in the academic calendar
    const calendarEntries = await AcademicCalendar.find();

    if (!calendarEntries || calendarEntries.length === 0) {
      return res.status(404).json({ message: 'No academic calendar entries found' });
    }

    // Map the calendar entries to format the response
    const academicCalendarData = calendarEntries.map(entry => ({
      date: entry.date,
      day: entry.day,
      holiday: entry.holiday || 'No holiday', // Provide a default value if 'holiday' is not defined
    }));

    return res.status(200).json({ message: academicCalendarData });
  } catch (error) {
    console.error('Error fetching academic calendar entries:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
