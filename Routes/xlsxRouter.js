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

router.post("/addstudentxlsx", isAdmin, async (req, res) => {
    try {

        const file = req.files.file;
        const workbook = xlsx.read(file.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const studentsData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        
        const students = await Promise.all(studentsData.map(async data => ({
            name: data.name,
            enrollment_no: data.enrollment_no,
            scholar_no: data.scholar_no,
            email: data.email,
            phone_no: data.phone_no,
            programme: data.programme,
            faculty: data.faculty,
            specialisation: data.specialisation,
            year: data.year,
            branch: data.branch,
            section: data.section,
            batch: data.batch,
            password: await bcrypt.hash(data.password, 10),
            created_at_and_by: {
                admin_name: req.user_id,
            },
            subjects: [],
            ratings: [],
        })));


        // Save the students to the database
        const savedStudents = await Student.insertMany(students);

        res.status(200).json({ msg: 'Students added successfully', data: savedStudents });

        // res.status(200).json({ msg: 'Students added successfully', data: students });  

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post("/addteacherxlsx", isAdmin, async (req, res) => {
    try {

        const file = req.files.file;
        const workbook = xlsx.read(file.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const teachersData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const teachers = await Promise.all(teachersData.map(async data => ({
            teacher_id: data.teacher_id,
            name: data.name,
            email: data.email,
            phone_no: data.phone_no,
            admin_role: data.admin_role,
            department: data.department,
            faculty: data.faculty,
            designation: data.designation,
            subjects: [],
            password: await bcrypt.hash(data.password, 10),
            created_at_and_by: {
                admin_name: req.user_id,
            }
        })));   

        // Save the teachers to the database
        const savedTeachers = await Teacher.insertMany(teachers);

        res.status(200).json({ msg: 'Teachers added successfully', data: savedTeachers });
        
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post("/addsubjectxlsx", isAdmin, async (req, res) => {
    try {

        const file = req.files.file;
        const workbook = xlsx.read(file.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const subjectsData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const subjects = await Promise.all(subjectsData.map(async data => ({
            subject_name: data.subject_name,
            course_code: data.course_code,
            branch: data.branch,
            section: data.section,
            batch: data.batch,
            teacher_id: data.teacher_id,
            lecture_dates: [],
            day: [],
        })));

        // Save the subjects to the database
        const savedSubjects = await Subject.insertMany(subjects);

        res.status(200).json({ msg: 'Subjects added successfully', data: savedSubjects });
        
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.get('/attendance-report/all', async (req, res) => {
    try {
      // Find all students
      const students = await Student.find();
  
      // Array to store all attendance reports
      const allReports = [];
  
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
            subject_name: subjectDetails.subject_name,
            course_code: subjectDetails.course_code,
            branch: subjectDetails.branch,
            section: subjectDetails.section,
            batch: subjectDetails.batch,
            attendance: {
              attended_classes: totalAttended,
              total_classes: totalClasses,
              percentage: attendancePercentage.toFixed(2),
            },
          };
  
          // Add the subject report to the overall attendance report for the current student
          attendanceReport.push(subjectReport);
        }
  
        // Create the final report for the current student
        const studentReport = {
          student_name: student.name,
          enrollment_number: student.enrollment_no,
          batch: student.batch,
          section: student.section,
          attendance_report: attendanceReport,
        };
  
        // Add the report for the current student to the array of all reports
        allReports.push(studentReport);
      }
  
      // Return all reports as JSON
      res.json(allReports);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });

module.exports = router;