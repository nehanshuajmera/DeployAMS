const jwt = require("jsonwebtoken");
const Teacher = require("../Model/teacherSchema");

const isAdmin = async (req, res, next) => {
  // Get the JWT token from the request cookies or headers
  const token = req.cookies._secureourapp || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token is expired
    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Unauthorized: Token has expired" });
    }

    // If the token is valid and not expired, you can access the user's information
    req.user_id = decoded.user_id;
    req.user_role = decoded.user_role;

    if (req.user_role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
    }

    // Check if the user has admin privileges (admin_role is "Admin")
    const teacher = await Teacher.findById(req.user_id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.admin_role !== "Admin" && teacher.admin_role !== "HOD") {
      return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = isAdmin;
