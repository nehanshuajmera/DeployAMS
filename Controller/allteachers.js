const Teacher = require("../Model/teacherSchema");
const Subject = require("../Model/subjectSchema");


const getallteacher=async (req, res) => {
    try {
    //   const userId = req.user_id; // You should have this information in your authentication middleware
    
        if (!(req.user_role === 'teacher'||req.user_role === 'student')) {
          return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
        }
    
        // // Check if the user has admin privileges (admin_role is "Admin")
        // const teacher = await Teacher.findById(userId);
    
        // if (!teacher) {
        //   return res.status(404).json({ message: "Teacher not found" });
        // }
    
        // if (teacher.admin_role !== "Admin") {
        //   return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
        // }
  
      // Find all teachers
      const teachers = await Teacher.find();
  
      if (!teachers || teachers.length === 0) {
        return res.status(404).json({ message: 'No teachers found' });
      }
  
      // Map teachers and get their subjects
      const teachersWithSubjects = await Promise.all(
        teachers.map(async (teacher) => {
          const subjects = await Subject.find({ teacher_id: teacher.teacher_id });
          
          const teacherSubjects = subjects.map(subject => ({
            subject_id: subject.subject_id,
            subject_name: subject.subject_name,
            course_code: subject.course_code,
            branch: subject.branch,
            section: subject.section,
            batch: subject.batch,
          }));
          
          return {
            teacher_id: teacher.teacher_id,
            name: teacher.name,
            email: teacher.email,
            phone_no: teacher.phone_no,
            admin_role: teacher.admin_role,
            subjects: teacherSubjects,
            updated_at: teacher.updated_at,
            created_at_and_by: teacher.created_at_and_by,
            rating: teacher.rating,
          };
        })
      );
      return res.status(200).json({ message: teachersWithSubjects });
    } catch (error) {
      console.error('Error fetching teachers with subjects:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports =getallteacher;