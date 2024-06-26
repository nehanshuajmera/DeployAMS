const express = require("express");
const router = express.Router();
const AcademicCalendar = require("../Model/calanderSchema"); // Import your AcademicCalendar model
const Teacher = require("../Model/teacherSchema");
const subject = require("../Model/subjectSchema");
const isAdmin = require("../Middleware/checkadmin");
const addLog=require('../Controller/logs');

// POST /create-academic-calendar - Create academic calendar entries for a date range
router.post("/create-academic-calendar",isAdmin, async (req, res) => {
  try {
    // Get the start date and end date from the request
    let { startDate, endDate } = req.body;
    startDate=new Date(startDate);
    endDate=new Date(endDate);

    if (startDate > endDate) {
      return res.status(400).json({ message: "Start date must be before end date" });
    }
    // console.log({startDate,endDate})
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }
    const oldacademicCalendarEntries = await AcademicCalendar.find();
    if(oldacademicCalendarEntries.length>0){
      return res.status(400).json({ message: "Academic calendar already created" });
    }

    // Calculate the date range
    const dateRange = createDateRange(startDate, endDate);

    // Create academic calendar entries with date and day, leaving "holiday" unassigned
    const academicCalendarEntries = dateRange.map(date => ({
      date: date,
      day: getDayOfWeek(date),
      holiday: getDayOfWeek(date)==="Sunday"?true:false, 
      event: getDayOfWeek(date)==="Sunday"?"Sunday":"No event",
    }));

    // console.log({academicCalendarEntries})
    // Insert the academic calendar entries into the database

    await AcademicCalendar.insertMany(academicCalendarEntries);
    addLog(`Academic Calendar Created from ${startDate} to ${endDate}`,req.user_id);

    return res.status(200).json({ message: "Academic calendar entries created successfully" });
  } catch (error) {
    console.error("Error creating academic calendar entries:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Function to create a date range between two dates
function createDateRange(startDate, endDate) {
  const dateRange = [];
  let currentDate = new Date(startDate);
  
  // currentDate.setHours(currentDate.getHours() + 5);
  // currentDate.setMinutes(currentDate.getMinutes() + 30);
  // endDate.setHours(endDate.getHours() + 5);
  // endDate.setMinutes(endDate.getMinutes() + 30);

  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
// console.log({dateRange})
  return dateRange;
}

// Function to get the day of the week (e.g., "Monday")
function getDayOfWeek(date) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getDay()];
}

// GET /academiccalendar - Retrieve all dates, days, and holidays from the academic calendar
router.get('/academiccalendar', isAdmin, async (req, res) => {
  try {
    // Find all entries in the academic calendar

    const calendarEntries = await AcademicCalendar.find();

    if (!calendarEntries || calendarEntries.length === 0) {
      return res.status(404).json({ message: 'No academic calendar entries found' });
    }
    
    return res.status(200).json({ message: calendarEntries });
  } catch (error) {
    console.error('Error fetching academic calendar entries:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// if new class was added we have to add it to subject schema that lecture_dates array
router.post('/updateholiday', isAdmin, async (req, res) => {
  try {
    // Get the date to mark as a holiday from the request body
    let { date,holiday,event } = req.body;
    date=(new Date(date));
    
    if (date < new Date()) {
      return res.status(400).json({ message: 'Cannot update past dates' });
    }
    
    if (date === undefined || date === null ) {
      return res.status(400).json({ message: 'Date is required to update as a holiday' });
      
    }
    
    // console.log({date,holiday,event})

    await AcademicCalendar.findOneAndUpdate(
      { date },
      { holiday, event},
    );
    addLog(`Academic Calendar Updated for ${date} as holiday`,req.user_id);
    return res.status(200).json({ message: 'Academic calendar updated to mark the date as a holiday' });
  } catch (error) {
    console.error('Error updating academic calendar:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



// add some more days to academic calendar
router.post('/addmoredays', isAdmin, async (req, res) => {
  try {
    const {dayscnt} = req.body;
    const oldacademicCalendarEntries = await AcademicCalendar.find();
    if(oldacademicCalendarEntries.length===0){
      return res.status(400).json({ message: "Academic calendar not created" });
    }
    var lastDate=oldacademicCalendarEntries[oldacademicCalendarEntries.length-1].date;
    // lastDate+1 day
    lastDate=new Date(lastDate);
    lastDate.setDate(lastDate.getDate()+1);
    
    const endDate=new Date(lastDate);
    endDate.setDate(endDate.getDate()+dayscnt-1);
    const startDate=lastDate;
    // console.log({startDate,endDate})
    // Calculate the date range
    const dateRange = createDateRange(startDate, endDate);
    
    // Create academic calendar entries with date and day, leaving "holiday" unassigned

    const academicCalendarEntries = dateRange.map(date => ({
      date: date,
      day: getDayOfWeek(date),
      holiday: getDayOfWeek(date)==="Sunday"?true:false, 
      event: getDayOfWeek(date)==="Sunday"?"Sunday":"No event",
    }));

    // console.log({academicCalendarEntries})
    // Insert the academic calendar entries into the database

    await AcademicCalendar.insertMany(academicCalendarEntries);

    addLog(`Academic Calendar Updated for ${dayscnt} days`,req.user_id);
    return res.status(200).json({ message: "Academic calendar entries created successfully" });

  } catch (error) {
    console.error("Error creating academic calendar entries:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.post("/updateday",isAdmin,async(req,res)=>{
  try {
    const {date,day} = req.body;
    const oldacademicCalendarEntries = await AcademicCalendar.find();
    if(oldacademicCalendarEntries.length===0){
      return res.status(400).json({ message: "Academic calendar not created" });
    }

    var thatdate=new Date(date);

    const oldday = await AcademicCalendar.findOne({date:thatdate});
    // console.log({oldday,day})
    if(oldday===day){
      return res.status(400).json({ message: "Day is already updated" });
    }

    await AcademicCalendar.findOneAndUpdate(
      { date },
      { day},
    );

    addLog(`Academic Calendar Updated for ${date} as ${day}`,req.user_id);

    return res.status(200).json({ message: 'Academic calendar updated Successfully' });
  } catch (error) {
    console.error('Error updating academic calendar:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;