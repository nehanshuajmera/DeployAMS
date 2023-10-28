const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("../Model/teacherSchema");
const isauthenticated = require("../Middleware/authenticated");
const Subject = require("../Model/subjectSchema");
const isClassScheduled = require("../Controller/isClassDay")
const Student = require("../Model/studentSchema");

// POST /login/ - Authenticate user and provide JWT token
router.post("/login", async (req, res) => {
  const { teacher_id, password } = req.body;

  try {
    // Find the user by enrollment number
    const teacher = await Teacher.findOne({ teacher_id });

    if (!teacher) {
      return res.status(401).json({ message: "Invalid Teacher ID or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, teacher.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Teacher ID or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        user_id: teacher._id,
        // user_id :teacher.enrollment_no,
        user_role: "teacher", // You can set the user's role here
        // suspicious_activity:`${teacher.name}, your activity has been sent to the Dean. Please check your college email at ${teacher.enrollment_no}@medicapas.ac.in `
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
      }
    );

    // Set the JWT token as a cookie in the response
    res.cookie("_secureourapp", token, {
      httpOnly: true,
      // secure: true, // Enable this in production with HTTPS
    });

    return res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


// GET /teacherdetails - Get authenticated teacher's details with subject details
router.get("/teacherdetails", isauthenticated, async (req, res) => {
  try {
    // Get the authenticated teacher's information from the request
    const userId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== "teacher") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-teacher users" });
    }

    // Fetch the teacher's details, including subject details
    const teacher = await Teacher.findById(userId).select("name subjects");

    if (!teacher) {
      return res.status(404).json({ message: "User not found" });
    }

    // Populate subject details for each subject in the teacher's array
    await teacher.populate({ path: "subjects.subject_id", model: Subject });

    return res.status(200).json({ message: teacher });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});



// GET /studentsattendance/:id - Get attendance for all students of a specific subject
router.get("/studentsattendance/:id", isauthenticated, async (req, res) => {
  try {
    // Get the authenticated teacher's information from the request
    const userId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== "teacher") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-teacher users" });
    }

    const subjectId = req.params.id; // Get the subject ID from the request parameters

    // Check if the teacher is assigned to the requested subject
    const subject = await Subject.findOne({ _id: subjectId, teacher_id: userId });

    if (!subject) {
      return res.status(403).json({ message: "Forbidden: Access denied for this subject" });
    }

    // Fetch attendance data for all students for the specified subject
    const studentsAttendance = await Student.find({ "subjects.subject_id": subjectId }).select("name subjects.attendance");

    return res.status(200).json({ mesaage: studentsAttendance });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


// GET /hasclasstoday/:id - Check if the subject with :id has a class scheduled for today
router.get("/hasclasstoday/:id", isauthenticated, async (req, res) => {
  try {
    const userId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== "teacher") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-teacher users" });
    }

    const subjectId = req.params.id; // Get the subject ID from the request parameters

    // Check if the subject with :id has a class scheduled for today
    const today = new Date();
    const hasClassToday = await isClassScheduled(today, subjectId);

    return res.status(200).json({ hasClassToday });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


// POST /updateattendance - Update student attendance for a subject
router.post('/updateattendance', isauthenticated, async (req, res) => {
  try {
    const teacherId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
    }

    // Get the request data (subject ID, student IDs, attendance date, and count)
    const { subjectId, studentIDs } = req.body;

    // Check if the teacher has permission to update attendance for this subject
    const subject = await Subject.findOne({ _id: subjectId, teacher_id: teacherId });

    if (!subject) {
      return res.status(403).json({ message: 'Forbidden: No permission to update attendance for this subject' });
    }

    // Check if the subject has a class scheduled for today
    const today = new Date();
    const hasClassToday = isClassScheduled(today, subjectId);
    if (!hasClassToday) {
      return res.status(403).json({ message: "Forbidden: No permission to update attendance today" });
    }

    // Update student attendance for each student in the studentIDs array
    for (const studentData of studentIDs) {
      const studentId = studentData.studentid;
      const count = studentData.count;

      const student = await Student.findOne({ _id: studentId });

      if (student) {
        // Find the subject in the student's subjects array
        const subjectIndex = student.subjects.findIndex(sub => sub.subject_id.equals(subject._id));

        if (subjectIndex !== -1) {
          const subjectAttendance = student.subjects[subjectIndex].attendance;

          // Check if the attendance assigned is less than or equal to the subject's count
          if (subjectAttendance.length + count <= subject.count) {
            // Update the attendance data
            for (let i = 0; i < count; i++) {
              subjectAttendance.push({ date: new Date(), count: 1, cause: '' });
            }

            await student.save();
          } else {
            return res.status(400).json({ message: 'Attendance limit exceeded' });
          }
        }
      }
    }

    return res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error('Error updating attendance:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


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
