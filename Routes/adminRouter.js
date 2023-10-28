const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("../Model/teacherSchema");
const isauthenticated = require("../Middleware/authenticated");
const Subject = require("../Model/subjectSchema");
const isClassScheduled = require("../Controller/isClassDay")
const Student = require("../Model/studentSchema");


// ADMIN PERMISSIONS

router.post("/createsubject", isauthenticated, async (req, res) => {
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
  
      // Create a new subject using the data from the request body
      const { subject_name, course_code, branch, section, batch, count, teacher_id, day } = req.body;
  
      const newSubject = new Subject({
        subject_name,
        course_code,
        branch,
        section,
        batch,
        count,
        teacher_id,
        attendance_date: [],
        day
      });
  
      // Save the new subject to the database
      const savedSubject = await newSubject.save();
  
      return res.status(201).json({ message: "Subject created successfully", subject: savedSubject });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.put("/updatesubject/:id", isauthenticated, async (req, res) => {
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
  
      const subjectId = req.params.id; // Get the subject ID from the request parameters
  
      // Find and update the subject by its ID
      const updatedSubject = await Subject.findByIdAndUpdate(
        subjectId,
        {
          $set: req.body, // Use the request body to update subject details
        },
        { new: true } // Return the updated subject
      );
  
      if (!updatedSubject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      return res.status(200).json({ message: "Subject updated successfully", subject: updatedSubject });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });


  // DELETE /deletesubject/:id - Delete a subject (only accessible by admin teachers)
  router.delete("/deletesubject/:id", isauthenticated, async (req, res) => {
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
  
      const subjectId = req.params.id; // Get the subject ID from the request parameters
  
      // Find and remove the subject by its ID
      const deletedSubject = await Subject.findByIdAndRemove(subjectId);
  
      if (!deletedSubject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      return res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  router.post("/createteacher", isauthenticated, async (req, res) => {
    try {
      const userId = req.user_id; // You should have this information in your authentication middleware
  
      // Check if the user has admin privileges (admin_role is "Admin")
  
      if (req.user_role !== 'teacher') {
        return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
      }
  
      const teacher = await Teacher.findById(userId);
  
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      if (teacher.admin_role !== "Admin") {
        return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
      }
  
      // Create a new teacher using the data from the request body
      const { teacher_id, name, email, phone_no, subjects, password } = req.body;
  
      const newTeacher = new Teacher({
        teacher_id,
        name,
        email,
        phone_no,
        admin_role: "Teacher",
        subjects,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
      });
  
      // Save the new teacher to the database
      const savedTeacher = await newTeacher.save();
  
      return res.status(201).json({ message: "Teacher created successfully", teacher: savedTeacher });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // PUT /updateteacher/:id - Update teacher information (only accessible by admin teachers)
  router.put("/updateteacher/:id", isauthenticated, async (req, res) => {
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
  
      const teacherId = req.params.id; // Get the teacher ID from the request parameters
  
      // Find and update the teacher by their ID
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        {
          $set: req.body, // Use the request body to update teacher details
        },
        { new: true } // Return the updated teacher
      );
  
      if (!updatedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      return res.status(200).json({ message: "Teacher information updated successfully", teacher: updatedTeacher });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  // DELETE /deleteteacher/:id - Delete a teacher (only accessible by admin teachers)
  router.delete("/deleteteacher/:id", isauthenticated, async (req, res) => {
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
  
      const teacherId = req.params.id; // Get the teacher ID from the request parameters
  
      // Find and remove the teacher by their ID
      const deletedTeacher = await Teacher.findByIdAndRemove(teacherId);
  
      if (!deletedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  
  // POST /createstudent - Create a new student (only accessible by admin teachers)
  router.post("/createstudent", isauthenticated, async (req, res) => {
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
  
      // Create a new student using the data from the request body
      const { name, enrollment_no, scholar_no, email, phone_no, branch, section, batch, password, subjects } = req.body;
  
      const newStudent = new Student({
        name,
        enrollment_no,
        scholar_no,
        email,
        phone_no,
        branch,
        section,
        batch,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
        subjects,
      });
  
      // Save the new student to the database
      const savedStudent = await newStudent.save();
  
      return res.status(201).json({ message: "Student created successfully", student: savedStudent });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // POST /createstudent - Create a new student (only accessible by admin teachers)
  router.post("/createstudent", isauthenticated, async (req, res) => {
    try {
      const userId = req.user_id; // You should have this information in your authentication middleware
  
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      // Check if the user has admin privileges (admin_role is "Admin")
      const teacher = await Teacher.findById(userId);
  
      if (teacher.admin_role !== "Admin") {
        return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
      }
  
      // Create a new student using the data from the request body
      const { name, enrollment_no, scholar_no, email, phone_no, branch, section, batch, password } = req.body;
  
      const newStudent = new Student({
        name,
        enrollment_no,
        scholar_no,
        email,
        phone_no,
        branch,
        section,
        batch,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
      });
  
      // Save the new student to the database
      const savedStudent = await newStudent.save();
  
      return res.status(201).json({ message: "Student created successfully", student: savedStudent });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

  // POST /updatestudent - Update student information
router.post('/updatestudent', isauthenticated, async (req, res) => {
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

      // Get the student ID from the request body
      const { studentId } = req.body;
  
      if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required to update student information' });
      }
  
      // Get the updated student data from the request body
      const updatedData = req.body.updatedData;
  
      if (!updatedData) {
        return res.status(400).json({ message: 'Updated student data is required' });
      }
  
      // Find the student by ID and update the specified fields
      const updatedStudent = await Student.findOneAndUpdate(
        { _id: studentId },
        { $set: updatedData },
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      return res.status(200).json({ message: 'Student information updated successfully', updatedStudent });
    } catch (error) {
      console.error('Error updating student information:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  // DELETE /deletestudent/:id - Delete a student (only accessible by admin teachers)
  router.delete("/deletestudent/:id", isauthenticated, async (req, res) => {
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
  
      const studentId = req.params.id; // Get the student ID from the request parameters
  
      // Find and remove the student by their ID
      const deletedStudent = await Student.findByIdAndRemove(studentId);
  
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  
module.exports = router;
