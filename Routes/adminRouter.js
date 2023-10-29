const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Teacher = require("../Model/teacherSchema");
const isauthenticated = require("../Middleware/authenticated");
const Subject = require("../Model/subjectSchema");
const Student = require("../Model/studentSchema");
const addLog = require('../Controller/logs');
const getallteacher = require("../Controller/allteachers");
const Complaint = require("../Model/complaintSchema");

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

      addLog({message:`Subject created: ${subject_name}`, createdBy:req.user_id})
  
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

      addLog({message:`Subject updated: ${subjectId}`, createdBy:req.user_id})
  
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
 
      addLog(`Subject deleted: ${subjectId}`, userId);
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
      
      addLog(`Teacher created: ${teacher_id}`, userId);

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
      addLog(`Teacher updated: ${teacherId}`, userId);
      
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
      addLog(`Teacher deleted: ${teacherId}`, userId);
  
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
      addLog(`Student created: ${name}`, userId);
  
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
      addLog(`Student updated: ${studentId}`, userId);

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
      addLog(`Student deleted: ${studentId}`, userId);

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


// GET /allsubjects - Retrieve all subjects with teacher details
router.get('/allsubjects', isauthenticated, async (req, res) => {
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

    // Find all subjects and populate the teacher details
    const subjects = await Subject.find().populate('teacher_id');

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: 'No subjects found' });
    }

    // Map the subjects and format the response
    const subjectsWithTeacherDetails = subjects.map(subject => ({
      subject_id: subject.subject_id,
      subject_name: subject.subject_name,
      course_code: subject.course_code,
      branch: subject.branch,
      section: subject.section,
      batch: subject.batch,
      teacher: {
        teacher_id: subject.teacher_id.teacher_id,
        name: subject.teacher_id.name,
        email: subject.teacher_id.email,
        phone_no: subject.teacher_id.phone_no,
      },
      attendance_date: subject.attendance_date,
      day: subject.day,
    }));

    return res.status(200).json({ subjects: subjectsWithTeacherDetails });
  } catch (error) {
    console.error('Error fetching subjects with teacher details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /allstudents - Retrieve all students with subjects and teacher details
router.get('/allstudents', isauthenticated, async (req, res) => {
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
    // Find all students
    const students = await Student.find();

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    // Map students and get their subjects and teacher details
    const studentsWithSubjectsAndTeachers = await Promise.all(
      students.map(async (student) => {
        const subjects = await Subject.find({ subject_id: { $in: student.subjects.map(sub => sub.subject_id) } }).populate('teacher_id');
        
        const studentSubjects = subjects.map(subject => ({
          subject_id: subject.subject_id,
          subject_name: subject.subject_name,
          course_code: subject.course_code,
          teacher: {
            teacher_id: subject.teacher_id.teacher_id,
            name: subject.teacher_id.name,
            email: subject.teacher_id.email,
            phone_no: subject.teacher_id.phone_no,
          },
        }));
        
        return {
          name: student.name,
          enrollment_no: student.enrollment_no,
          scholar_no: student.scholar_no,
          email: student.email,
          phone_no: student.phone_no,
          branch: student.branch,
          section: student.section,
          batch: student.batch,
          subjects: studentSubjects,
        };
      })
    );

    return res.status(200).json({ message: studentsWithSubjectsAndTeachers });
  } catch (error) {
    console.error('Error fetching students with subjects and teacher details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// GET /allteachers - Retrieve all teachers with their subjects
router.get('/allteachers', isauthenticated,getallteacher);

// GET /complaints - Retrieve all complaints
router.get('/allcomplaints', isauthenticated, async (req, res) => {
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
    // Retrieve all complaints from the database
    const allComplaints = await Complaint.find();

    res.status(200).json({ complaints: allComplaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
