const jwt = require("jsonwebtoken");
const Teacher = require("../Model/teacherSchema");

const isTeacher = async (req, res, next) => {

  try {

    if (req.user_role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
    }

    // Check if the user has admin privileges (admin_role is "Admin")
    const teacher = await Teacher.findById(req.user_id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = isTeacher;