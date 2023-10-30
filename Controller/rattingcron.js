const Teacher = require("../Model/teacherSchema");
const Student = require("../Model/studentSchema");

// Calculate teacher ratings and update them
const calculateTeacherRatings = async () => {
    try {
      // Get all teachers
      const teachers = await Teacher.find();
  
      for (const teacher of teachers) {
        // Calculate the average rating for this teacher
        const students = await Student.find({ 'subjects.subject_id': teacher._id });
        let totalRatings = 0;
        let totalParticipants = 0;
  
        for (const student of students) {
          const subject = student.subjects.find((sub) => sub.subject_id.equals(teacher._id));
          if (subject) {
            const studentRating = subject.rating.star;
            if (!isNaN(studentRating)) {
              totalRatings += studentRating;
              totalParticipants++;
            }
          }
        }
  
        if (totalParticipants > 0) {
          const averageRating = totalRatings / totalParticipants;
          teacher.rating.star = averageRating;
          teacher.rating.participants = totalParticipants;
  
          await teacher.save();
        }
      }
  
      console.log('Teacher ratings updated successfully');
    } catch (error) {
      console.error('Error updating teacher ratings:', error);
    }
  };
  
  module.exports = calculateTeacherRatings;
  