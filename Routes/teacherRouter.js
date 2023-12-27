const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("../Model/teacherSchema");
const isauthenticated = require("../Middleware/authenticated");
const isTeacher = require("../Middleware/checkteacher");
const Subject = require("../Model/subjectSchema");
const Student = require("../Model/studentSchema");
const addLog = require('../Controller/logs');

const { createLeaveTeacherAttendance, getLeaveTeacherAttendanceByteacherId, getassignTeachersubjectallStudentsbydate, markleaveattendanceontoday } = require("../Controller/leaveTeacherAttendance");


// POST /login/ - Authenticate user and provide JWT token
router.post("/login", async (req, res) => {
  const { teacher_id, password } = req.body;

  try {
    // Find the user by enrollment number
    if (!teacher_id || !password) {
      return res.status(401).json({ message: "Invalid Teacher ID or password" });
    }

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
        expiresIn: "3h", // Token expires in 1 hour (adjust as needed)
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


// GET /details - Get authenticated teacher's details with subject details
router.get("/details", isauthenticated, async (req, res) => {
  try {
    // Get the authenticated teacher's information from the request
    const userId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== "teacher") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-teacher users" });
    }

    // Fetch the teacher's details, including subject details
    const teacher = await Teacher.findById(userId);

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
    // console.log(userId)

    // console.log(req.user_role,req.user_id)
    if (req.user_role !== "teacher") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-teacher users" });
    }


    const subjectId = req.params.id; // Get the subject ID from the request parameters

    // Check if the teacher is assigned to the requested subject
    const subject = await Subject.findOne({ _id: subjectId, teacher_id: userId });
    // const subject1 = await Subject.findOne({ _id: subjectId });

    // console.log(subject)
    if (!subject) {
      return res.status(403).json({ message: "Forbidden: Access denied for this subject" });
    }


    // Fetch attendance data for all students for the specified subject
    const studentsAttendance = await Student.find({ "subjects.subject_id": subjectId });
    // console.log(studentsAttendance)

    return res.status(200).json({ message: studentsAttendance });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
});


// GET /hasclasstoday/:id - Check if the subject with :id has a class scheduled for today
router.get("/hasclasstoday/:id", isauthenticated, isTeacher, async (req, res) => {
  try {

    const subjectId = req.params.id; // Get the subject ID from the request parameters

    // Check if the subject with :id has a class scheduled for today
    const today = new Date();
    // console.log({subjectId,today})
    let isclasstoday = await Subject.findById(subjectId);
    // console.log(isclasstoday.lecture_dates)
    isclasstoday = isclasstoday?.lecture_dates?.find(d => d.date.getFullYear() === today.getFullYear() && d.date.getMonth() === today.getMonth() && d.date.getDate() === today.getDate());
    // console.log({isclasstoday})
    if (!isclasstoday) {
      return res.status(200).json({ message: "No Class Today" });
    }
    return res.status(200).json({ message: "Class Today", count: isclasstoday.count });
  } catch (error) {
    console.error("Error checking if class is scheduled for today:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// POST /updateattendance - Update student attendance for a subject
router.post('/updateattendance', isauthenticated, isTeacher, async (req, res) => {
  try {
    const teacherId = req.user_id; // You should have this information in your authentication middleware

    // Get the request data (subject ID, student IDs, attendance date, and count)
    const { subjectId, studentIDs } = req.body;

    // Check if the teacher has permission to update attendance for this subject
    const subject = await Subject.findOne({ _id: subjectId, teacher_id: teacherId });



    if (!subject) {
      return res.status(403).json({ message: 'Forbidden: No permission to update attendance for this subject' });
    }

    // Check if the subject has a class scheduled for today
    const today = new Date();
    let isclasstoday = await Subject.findById(subjectId);
    // console.log(isclasstoday.lecture_dates)
    isclasstoday = isclasstoday?.lecture_dates?.find(d => d.date.getFullYear() === today.getFullYear() && d.date.getMonth() === today.getMonth() && d.date.getDate() === today.getDate());
    // console.log({isclasstoday})
    if (!isclasstoday) {
      return res.status(403).json({ message: "No Class Today" });
    }

    // [ { studentid: '60f9c9b0e9c9a00f1c0f0e1e', count: 1  }, { studentid: '60f9c9b0e9c9a00f1c0f0e1f', count: 0 }]
    // Update student attendance for each student in the studentIDs array
    for (const studentData of studentIDs) {
      const studentId = studentData.studentid;
      const count = studentData.count;

      if (count > isclasstoday.count) {
        return res.status(403).json({ message: "Attendance limit exceeded" });
      }
      const student = await Student.findOne({ _id: studentId });

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }


      const subjectIndex = student.subjects.findIndex(sub => sub.subject_id.equals(subject._id));

      if (subjectIndex !== -1) {
       
        const subjectAttendance = student.subjects[subjectIndex].attendance;
        // Check if the attendance assigned is less than or equal to the subject's count
        if (subjectAttendance.length) {

          // in studentAttendance array find their is todays date present or not if present then update the count else push the new object
          const today = new Date();
          const attendanceIndex = subjectAttendance.findIndex(att => att.date.getFullYear() === today.getFullYear() && att.date.getMonth() === today.getMonth() && att.date.getDate() === today.getDate());
          if (attendanceIndex !== -1) {
            subjectAttendance[attendanceIndex].count = count;
            // if count is 0 then remove that object from array
            if (count === 0) {
              subjectAttendance.splice(attendanceIndex, 1);
            }
          }
          else {
            subjectAttendance.push({ date: new Date(), count, cause: '' });
          }
        }

        await student.save();
        
      }
      else {
        return res.status(404).json({ message: "Student not found" });
      }

    }

    // addLog(`Student attendance updated for subject: ${subject._id}`, teacherId);

    return res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error('Error updating attendance:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



// POST /changepassword - Change teacher's password
router.post("/changepassword", isauthenticated, isTeacher, async (req, res) => {
  try {
    const teacherId = req.user_id; // You should have this information in your teacher authentication middleware

    if (req.user_role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    // Find the teacher by their ID
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher Details not found" });
    }

    // Check if the current password provided in the request matches the stored password
    const isPasswordMatch = await bcrypt.compare(currentPassword, teacher.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update the password to the new password provided in the request
    teacher.password = await bcrypt.hash(newPassword, 10); // Encrypt the new password

    // Save the updated teacher information
    await teacher.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// all leaveTeacherAttendance routes
router.post("/createleaveTeacherAttendance", isauthenticated, isTeacher, createLeaveTeacherAttendance);
router.get("/getleaveTeacherAttendance", isauthenticated, isTeacher, getLeaveTeacherAttendanceByteacherId);
router.post("/getassignTeachersubjectallStudentsbydate", isauthenticated, isTeacher, getassignTeachersubjectallStudentsbydate);
router.post("/markleaveattendanceontoday", isauthenticated, isTeacher, markleaveattendanceontoday);


module.exports = router;
