const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../Model/studentSchema");
const Subject = require("../Model/subjectSchema");
const Complaint = require("../Model/complaintSchema");
const isauthenticated = require("../Middleware/authenticated");
const getallteacher = require("../Controller/allteachers");

// POST /login/ - Authenticate user and provide JWT token
router.post("/login", async (req, res) => {
  const { enrollment_no, password } = req.body;

  try {
    // Find the user by enrollment number
    const student = await Student.findOne({ enrollment_no });

    if (!student) {
      return res.status(401).json({ message: "Invalid enrollment number or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, student.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid enrollment number or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        user_id: student._id,
        // user_enrollment_no :student.enrollment_no,
        user_role: "student", // You can set the user's role here
        // suspicious_activity:`${student.name}, your activity has been sent to the Dean. Please check your college email at ${student.enrollment_no}@medicapas.ac.in `
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


router.get("/detail", isauthenticated, async (req, res) => {
  try {
    // Get the authenticated user's information from the request
    const userId = req.user_id; // You should have this information in your authentication middleware

    if (req.user_role !== "student") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-student users" });
    }

    // Fetch the user's attendance data from the database
    const student = await Student.findById(userId);

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Populate subject details for each subject in the student's array
    await student.populate({ path: "subjects.subject_id", model: Subject });

    return res.status(200).json({ message: student });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});



// POST /changepassword - Change student's password
router.post("/changepassword", isauthenticated, async (req, res) => {
  try {
      const studentId = req.user_id; // You should have this information in your student authentication middleware
      
      if (req.user_role !== "student") {
        return res.status(403).json({ message: "Forbidden: Access denied for non-student users" });
      }

      // Find the student by their ID
      const student = await Student.findById(studentId);

      if (!student) {
          return res.status(404).json({ message: "Student not found" });
      }

      // Check if the current password provided in the request matches the stored password
      const isPasswordMatch = await bcrypt.compare(req.body.currentPassword, student.password);

      if (!isPasswordMatch) {
          return res.status(400).json({ message: "Current password is incorrect" });
      }

      // Update the password to the new password provided in the request
      student.password = await bcrypt.hash(req.body.newPassword, 10); // Encrypt the new password

      // Save the updated student information
      await student.save();

      return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /allteachers - Retrieve all teachers with their subjects
router.get('/allteachers', isauthenticated,getallteacher);

// POST /complaints - Create a new complaint
router.post('/complaints',isauthenticated, async (req, res) => {
  try {
    const studentId = req.user_id; // You should have this information in your student authentication middleware
      
      if (req.user_role !== "student") {
        return res.status(403).json({ message: "Forbidden: Access denied for non-student users" });
      }

      // Find the student by their ID
      const student = await Student.findById(studentId);

      if (!student) {
          return res.status(404).json({ message: "Student not found" });
      }
    const { teacher_id, message } = req.body;

    // Create a new complaint
    const newComplaint = new Complaint({
      teacher_id, // Assuming you have the teacher's ID
      student_id:studentId, // Assuming you have the student's ID
      message,
    });

    // Save the new complaint to the database
    const savedComplaint = await newComplaint.save();

    res.status(201).json({ message: 'Complaint sent successfully', complaint: savedComplaint });
  } catch (error) {
    console.error('Error sending complaint:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /givestar - Give a star rating to a teacher
router.post('/givestar', async (req, res) => {
  try {
    const studentId = req.user_id; // You should have this information in your authentication middleware

    // Get the request data (teacher ID and star rating)
    const { teacherId, star } = req.body;

    // Check if the provided teacher ID exists
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if the provided star rating is valid (between 0 and 5)
    if (star < 0 || star > 5) {
      return res.status(400).json({ message: 'Invalid star rating. Must be between 0 and 5' });
    }

    // Check if the student has already rated the teacher
    const student = await Student.findById(studentId);
    const existingRating = student.ratings.find((rating) => rating.teacher_id.equals(teacherId));

    if (existingRating) {
      existingRating.star = star;
      await student.save();
      return res.status(400).json({ message: 'You have already rated this teacher so, Ratting updated Successfully' });
    }

    // Add the new rating to the student's ratings
    student.ratings.push({ star, teacher_id: teacherId });
    await student.save();

    // Calculate and update the average teacher rating (you can reuse the calculateTeacherRatings function from a previous response)

    // Respond with a success message
    return res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error giving a star rating to the teacher:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
