const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("../Model/teacherSchema");
const isauthenticated = require("../Middleware/authenticated");
const Subject = require("../Model/subjectSchema");
const isClassDay= require("../Controller/isClassDay")

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


router.get("/hasclasstoday", isauthenticated, async (req, res) => {
    try {
        const userId = req.user_id; // You should have this information in your authentication middleware

        if (req.user_role !== "teacher") {
        return res.status(403).json({ message: "Forbidden: Access denied for non-teacher users" });
        }
        // Get today's date
        const today = new Date();
        const hasClassToday = isClassDay(today);
        return res.status(200).json({ message: hasClassToday });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;
