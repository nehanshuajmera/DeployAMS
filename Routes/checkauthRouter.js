const express = require("express");
const router = express.Router();
const isauthenticated = require("../Middleware/authenticated");
const Teacher = require("../Model/teacherSchema");

// GET /check-auth - Check authentication and send user_role
router.get("/", isauthenticated, async(req, res) => {
  try {
    const userId = req.user_id; 
    const userRole = req.user_role;
    if (req.user_role !== 'teacher') {
      return res.status(200).json({ message: userRole });
    }

    // Check if the user has admin privileges (admin_role is "Admin")
    const teacher = await Teacher.findById(userId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.admin_role !== "Admin") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
    }

    // Send the user_role in the response
    return res.status(200).json({ message: "Admin" });

  } catch (error) {
    console.log({error})
    return res.status(500).json({ message: "Internal server error", error:error });
  }
});

module.exports = router;
