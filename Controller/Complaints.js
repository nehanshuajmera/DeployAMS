const Complaint = require("../Model/complaintSchema");

const all_complaints = async (req, res) => {
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
  }

module.exports = {all_complaints};