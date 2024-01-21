const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../Model/studentSchema');
const Teacher = require('../Model/teacherSchema');
const Subject = require('../Model/subjectSchema');
const xlsx = require('xlsx');
const bcrypt = require("bcrypt");
const isauthenticated = require('../Middleware/authenticated');
const isAdmin = require('../Middleware/checkadmin');
const fs = require('fs'); 
const addLog=require('../Controller/logs');

router.post("/addstudentxlsx", isAdmin, async (req, res) => {
    try {
        const file = req.files.file;
        
        // Check file format
        if (!file || !file.mimetype.includes("xlsx")) {
            return res.status(400).json({ msg: 'Invalid file format. Please upload an xlsx file.' });
        }

        const workbook = xlsx.read(file.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const studentsData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // const password="medicaps";
        const password = data.password;

        
        const students = await Promise.all(studentsData.map(async data => ({
            name: data.name,
            enrollment_no: data.enrollment_no,
            scholar_no: data.scholar_no,
            email: (data.enrollment_no + "@medicaps.ac.in").toLowerCase(),
            phone_no: data.phone_no,
            programme: data.programme,
            faculty: data.faculty,
            specialisation: data.specialisation,
            year: data.year,
            department: data.department,
            class_name: data.class_name,
            branch: data.branch,
            section: data.section,
            batch: "None",
            password: await bcrypt.hash(password, 10),
            created_at_and_by: {
                admin_name: req.user_id,
            },
            subjects: [],
            ratings: [],
        })));


        // Save the students to the database
        const savedStudents = await Student.insertMany(students);

        addLog("Added Students via xlsx",req.user_id);

        res.status(200).json({ msg: 'Students added successfully', data: savedStudents });

        // res.status(200).json({ msg: 'Students added successfully', data: students });  

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post("/addteacherxlsx", isAdmin, async (req, res) => {
    try {

        const file = req.files.file;
        // Check file format
        if (!file || !file.mimetype.includes("xlsx")) {
          return res.status(400).json({ msg: 'Invalid file format. Please upload an xlsx file.' });
        }
        const workbook = xlsx.read(file.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const teachersData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        // console.log(teachersData)
        const password="medicaps";

        const teachers = await Promise.all(teachersData.map(async data => ({
            teacher_id: data.teacher_id,
            name: data.name,
            email: data.email,
            phone_no: data.phone_no,
            department: data.department,
            faculty: data.faculty,
            admin_role: "teacher",
            designation: "teacher",
            subjects: [],
            password: await bcrypt.hash(password, 10),
            created_at_and_by: {
                admin_name: req.user_id,
            }
        })));   

        // Save the teachers to the database
        const savedTeachers = await Teacher.insertMany(teachers);
        addLog("Added Teacher via xlsx",req.user_id);


        res.status(200).json({ msg: 'Teachers added successfully', data: savedTeachers });
        
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post("/addsubjectxlsx", isAdmin, async (req, res) => {
    try {
        const file = req.files.file;
        
        // Check file format
        if (!file || !file.mimetype.includes("xlsx")) {
          return res.status(400).json({ msg: 'Invalid file format. Please upload an xlsx file.' });
        }

        const workbook = xlsx.read(file.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const subjectsData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const subjects = await Promise.all(subjectsData.map(async data => ({
            subject_name: data.subject_name,
            course_code: data.course_code,
            branch: data.branch,
            section: data.section,
            department: data.department,
            class_name: data.class_name,
            batch: data.batch,
            year: data.year,
            lecture_dates: [],
            day: [],
        })));

        // Save the subjects to the database
        const savedSubjects = await Subject.insertMany(subjects);
        
        addLog("Added Subjects via xlsx",req.user_id);

        res.status(200).json({ msg: 'Subjects added successfully', data: savedSubjects });
        
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

const backupandmail = require('../Postman/vscode/key.js');

router.get('/sendalldata', async (req, res) => {
  try{
    backupandmail();
    res.status(200).json({ msg: 'Data sent successfully' });
  }
  catch(err){
    res.status(500).json({ msg: 'Internal server error' });
  }
});


router.get('/attendance-report/all', isAdmin, async (req, res) => {
  try {
    // Find all students
    const students = await Student.find();

    // Create a new workbook
    const workbook = xlsx.utils.book_new();

    // Create a worksheet for the entire attendance report
    const worksheet = xlsx.utils.json_to_sheet([
      {
        name: 'Name',
        enrollment_no: 'Enrollment No.',
        subject_name: 'Subject Name',
        attended_classes: 'Attended Classes',
        total_classes: 'Total Classes',
        percentage: 'Percentage',
      },
    ]);

    // Loop through each student
    for (const student of students) {
      // Array to store the attendance report for the current student
      const attendanceReport = [];

      // Loop through each subject in the student's subjects array
      for (const subject of student.subjects) {
        // Find the subject details
        const subjectDetails = await Subject.findById(subject.subject_id);

        // Calculate total attended and total classes
        let totalAttended = 0;
        let totalClasses = 0;

        for (const attendanceEntry of subject.attendance) {
          totalAttended += attendanceEntry.count;
        }

        for (const lectureDate of subjectDetails.lecture_dates) {
          totalClasses += lectureDate.count;
        }

        // Calculate attendance percentage
        const attendancePercentage = (totalAttended / totalClasses) * 100;

        // Create an object for the subject in the report
        const subjectReport = {
          name: student.name,
          enrollment_no: student.enrollment_no,
          subject_name: subjectDetails.subject_name,
          attended_classes: totalAttended,
          total_classes: totalClasses,
          percentage: `${attendancePercentage.toFixed(2)}%`,
        };

        // Add the subject report to the overall attendance report for the current student
        attendanceReport.push(subjectReport);
      }

      // Add the attendance report for the current student to the worksheet
      xlsx.utils.sheet_add_json(worksheet, attendanceReport, { skipHeader: true, origin: -1 });
    }

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');

    // Generate a unique filename for the Excel file
    const fileName = `attendancereport.xlsx`;

    // Save the workbook to a file
    xlsx.writeFile(workbook, fileName);

    // Send the Excel file as a response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.sendFile(fileName, { root: '.' }, () => {
      // Cleanup: delete the temporary Excel file after sending
      setTimeout(() => {
        try {
          fs.unlinkSync(fileName);
        } catch (error) {
          console.error('Error deleting temporary file:', error);
        }
      }, 1000);
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


module.exports = router;