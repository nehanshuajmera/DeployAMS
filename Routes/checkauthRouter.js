const express = require("express");
const router = express.Router();
const isauthenticated = require("../Middleware/authenticated");
const Teacher = require("../Model/teacherSchema");

// GET /check-auth - Check authentication and send user_role
router.get("/", isauthenticated, async(req, res) => {
  try {
    const userId = req.user_id; 
    const userRole = req.user_role;

    // Check if the user is a student
    if (req.user_role !== 'teacher') {
      return res.status(200).json({ message: userRole });
    }

    // Check if the user has admin privileges (admin_role is "Admin")
    const teacher = await Teacher.findById(userId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.admin_role !== "Admin") {
      return res.status(200).json({ message: "teacher" });
    }

    // Send the user_role in the response
    return res.status(200).json({ message: "Admin" });

  } catch (error) {
    console.log({error})
    return res.status(500).json({ message: "Internal server error", error:error });
  }
});

// logout api
router.get("/logout", isauthenticated, async(req, res) => {
  try {
    
    res.cookie("_secureourapp", "", {
      httpOnly: true,
      // secure: true, // Enable this in production with HTTPS
    });
    
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log({error})
    return res.status(500).json({ message: "Internal server error", error:error });
  }
});

module.exports = router;