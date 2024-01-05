const bcrypt = require("bcrypt");
const Teacher = require("../Model/teacherSchema");
const Subject = require("../Model/subjectSchema");
const Student = require("../Model/studentSchema");
// const addLog = require('../Controller/logs');

const create_student=async (req, res) => {
    try {
      // Create a new student using the data from the request body
      const { name, enrollment_no, programme,faculty, specialisation, year, scholar_no, email, phone_no, branch, section, batch, password, subjects, department,class_name } = req.body;

      if (!name || !enrollment_no || !programme || !faculty || !specialisation || !year || !scholar_no || !email || !phone_no || !branch || !section || !batch || !password || !subjects) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newStudent = new Student({
        name,
        enrollment_no,
        scholar_no,
        programme,
        faculty,
        specialisation,
        year,
        department,class_name,
        email,
        phone_no,
        branch,
        section,
        batch,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
        subjects,
      });
      // addLog(`Student created: ${name}`, userId);
  
      // Save the new student to the database
      const savedStudent = await newStudent.save();
  
      return res.status(201).json({ message: "Student created successfully", student: savedStudent });
    } catch (error) {
      console.log({error})
      return res.status(500).json({ message: "Internal server error" });
    }
  }

const update_student_by_id= async (req, res) => {
    try {

      // Get the student ID from the request body
      const studentId = req.params.id;
  
      if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required to update student information' });
      }
  
      // Get the updated student data from the request body
      // const updatedData = req.body.updatedData;
  
      // if (!updatedData) {
      //   return res.status(400).json({ message: 'Updated student data is required' });
      // }
      // addLog(`Student updated: ${studentId}`, userId);

      // Find the student by ID and update the specified fields
      const updatedStudent = await Student.findByIdAndUpdate(studentId,
        {
          $set: req.body, // Use the request body to update teacher details
        },
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
  }

const delete_student_by_id= async (req, res) => {
    try {
  
      const studentId = req.params.id; // Get the student ID from the request parameters
      // addLog(`Student deleted: ${studentId}`, userId);

      // Find and remove the student by their ID
      const deletedStudent = await Student.findByIdAndRemove(studentId);
  
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

const all_students=async (req, res) => {
    try {
      const userId = req.user_id; // You should have this information in your authentication middleware
    
      // Find all students
      const students = await Student.find();
  
      if (!students || students.length === 0) {
        return res.status(404).json({ message:[], error: 'No students found' });
      }
  
      // Map students and get their subjects and teacher details
      const studentsWithSubjectsAndTeachers = await Promise.all(
        students.map(async (student) => {
          // const subjects = await Subject.find({ subject_id: { $in: student.subjects.map(sub => sub.subject_id) } }).populate('teacher_id');
          
          // const studentSubjects = subjects.map(subject => ({
          //   subject_id: subject.subject_id,
          //   subject_name: subject.subject_name,
          //   course_code: subject.course_code,
            
          //   teacher: {
          //     teacher_id: subject.teacher_id.teacher_id,
          //     name: subject.teacher_id.name,
          //     email: subject.teacher_id.email,
          //     phone_no: subject.teacher_id.phone_no,
          //   },
          // }));
          
          
          // return {
          //   id: student._id,
          //   name: student.name,
          //   enrollment_no: student.enrollment_no,
          //   scholar_no: student.scholar_no,
          //   email: student.email,
          //   phone_no: student.phone_no,
          //   branch: student.branch,
          //   section: student.section,
          //   batch: student.batch,
          //   year: student.year,
          //   programme: student.programme,
          //   faculty: student.faculty,
          //   specialisation: student.specialisation,
          //   subjects: studentSubjects,
          // };

          return {
            id: student._id,
            name: student.name,
            enrollment_no: student.enrollment_no,
            scholar_no: student.scholar_no,
            email: student.email,
            phone_no: student.phone_no,
            branch: student.branch,
            section: student.section,
            batch: student.batch,
            year: 2024 - student.year,
            programme: student.programme,
            faculty: student.faculty,
            specialisation: student.specialisation,
            subjects: student.subjects,
          };
        })
      );
  
      return res.status(200).json({ message: studentsWithSubjectsAndTeachers });
    } catch (error) {
      console.error('Error fetching students with subjects and teacher details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports ={create_student,update_student_by_id,delete_student_by_id,all_students};