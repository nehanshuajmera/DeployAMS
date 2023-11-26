const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Teacher = require("../Model/teacherSchema");
const isAdmin = require("../Middleware/checkadmin");
const Subject = require("../Model/subjectSchema");
const Student = require("../Model/studentSchema");
const AcademicCalander = require("../Model/calanderSchema");
const addLog = require('../Controller/logs');
const getallteacher = require("../Controller/allteachers");
const Complaint = require("../Model/complaintSchema");

// ADMIN PERMISSIONS

router.post("/createsubject", isAdmin, async (req, res) => {
    try {
  
      // Create a new subject using the data from the request body
      const { subject_name, course_code, branch, section, batch,  teacher_id, day } = req.body;
 
      const lecture_dates = [];
      const today = new Date();
      // from todays date run a loop till academic calander last date and assign the dates to lecture_dates array in which days match with the day of the week
      const academicCalander = await AcademicCalander.findOne({academic_year: today.getFullYear()});
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const lastDate = academicCalander[academicCalander.length-1].date;  
      while(todayDate <= lastDate){
        // if todayDate is holiday then don't add that day in lecture_dates
        const holiday = academicCalander.find(d => d.date === todayDate);
        if(holiday){
          todayDate.setDate(todayDate.getDate() + 1);
          continue;
        }
        // if todayDate.getDay()  find in array day where array day contain objects {nameof day, count of lectures} has and push to lecture_dates
        const dayObj = day.find(d => d.name === todayDate.getDay());
        
        if(dayObj){
          lecture_dates.push({date: todayDate, count: dayObj.count});
        }

        todayDate.setDate(todayDate.getDate() + 1);
      }

      const newSubject = new Subject({
        subject_name,
        course_code,
        branch,
        section,
        batch,
        teacher_id,
        lecture_dates,
        day
      });
      

      // addLog({message:`Subject created: ${subject_name}`, createdBy:req.user_id})
  
      // Save the new subject to the database
      const savedSubject = await newSubject.save();
      const updatedteacher= await Teacher.updateOne({ teacher_id: teacher_id }, { $push: { subjects: { subject_id: savedSubject._id, permission:"write" } } });
  
      return res.status(201).json({ message: "Subject created successfully", subject: savedSubject });
    } catch (error) {
      console.error({error})
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/changetimetable/:id", isAdmin, async (req, res) => {
    // to change timetable we have to change lecture_dates array in subject schema we have to recompute it but what if attendance is already taken we don't have to delete that lecture_dates array
    try {
  

    const subjectId = req.params.id; // Get the subject ID from the request parameters
    const { day } = req.body;
    const today = new Date();
    const academicCalander = await AcademicCalander.find();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const lastDate = academicCalander[academicCalander.length-1].date;
    const lecture_dates = [];
    
    // we wil first assign old data of lecture_dates to new lecture_dates array before todays date
    const oldSubject = await Subject.findById(subjectId);
    const oldLectureDates = oldSubject.lecture_dates;
    const oldLectureDatesBeforeToday = oldLectureDates.filter(d => d.date < todayDate); 
    lecture_dates.push(...oldLectureDatesBeforeToday);


    while(todayDate <= lastDate){
      // if todayDate is holiday then don't add that day in lecture_dates
      const holiday = academicCalander.find(d => d.date === todayDate);
      if(holiday){
        todayDate.setDate(todayDate.getDate() + 1);
        continue;
      }
      // if todayDate.getDay()  find in array day where array day contain objects {nameof day, count of lectures} has and push to lecture_dates
      const dayObj = day.find(d => d.name === todayDate.getDay());
      
      if(dayObj){
        lecture_dates.push({date: todayDate, count: dayObj.count});
      }

      todayDate.setDate(todayDate.getDate() + 1);
    } 
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      {
        $set: {lecture_dates, day}, // Use the request body to update subject details
      },
      { new: true } // Return the updated subject
    );  
    return res.status(200).json({ message: "Subject updated successfully", subject: updatedSubject });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  });
  

  router.post("/extralecture/:id", isAdmin, async (req, res) => {
    try{
      // push {date, count,cause:"Extra Class"} in lecture dates array
      const subjectId = req.params.id; // Get the subject ID from the request parameters
      const { date, count, cause } = req.body;
      // convert this date and push all this data in lecture_dates array
      const updateextralecture = await Subject.findByIdAndUpdate(
        subjectId,
        {
          $push: {lecture_dates: {date, count, cause}}, // Use the request body to update subject details
        },
        { new: true } // Return the updated subject
      );

      return res.status(200).json({ message: "Extra Lecture added successfully", subject: updateextralecture });
    }
    catch(error){
      return res.status(500).json({ message: "Internal server error" });
    }
  })


  router.put("/updatesubject/:id", isAdmin, async (req, res) => {
    try {
  
      const subjectId = req.params.id; // Get the subject ID from the request parameters

      addLog({message:`Subject updated: ${subjectId}`, createdBy:req.user_id})
  
      // Find and update the subject by its ID
      const updatedSubject = await Subject.findByIdAndUpdate(
        subjectId,
        {
          $set: req.body, // Use the request body to update subject details
        },
        { new: true } // Return the updated subject
      );
  
      if (!updatedSubject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      return res.status(200).json({ message: "Subject updated successfully", subject: updatedSubject });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });





  // DELETE /deletesubject/:id - Delete a subject (only accessible by admin teachers)
  router.delete("/deletesubject/:id", isAdmin, async (req, res) => {
    try {
      
      const subjectId = req.params.id; // Get the subject ID from the request parameters
      
      if (!subjectId) {
        return res.status(400).json({ message: "Subject ID is required to delete a subject" });
      }

      addLog(`Subject deleted: ${subjectId}`, userId);
      // Find and remove the subject by its ID
      const deletedSubject = await Subject.findByIdAndRemove(subjectId);
          
      return res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  router.post("/createteacher", isAdmin, async (req, res) => {
    try {
      const userId = req.user_id; // You should have this information in your authentication middleware
  
      // Check if the user has admin privileges (admin_role is "Admin")
  
      if (req.user_role !== 'teacher') {
        return res.status(403).json({ message: 'Forbidden: Access denied for non-teacher users' });
      }
  
      const teacher = await Teacher.findById(userId);
  
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      if (teacher.admin_role !== "Admin") {
        return res.status(403).json({ message: "Forbidden: Access denied for non-admin teachers" });
      }
  
      // Create a new teacher using the data from the request body
      const { teacher_id, name, email, phone_no, subjects, password } = req.body;
  
      const newTeacher = new Teacher({
        teacher_id,
        name,
        email,
        phone_no,
        admin_role: "Teacher",
        subjects,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
      });
      
      addLog(`Teacher created: ${teacher_id}`, userId);

      // Save the new teacher to the database
      const savedTeacher = await newTeacher.save();
  
      return res.status(201).json({ message: "Teacher created successfully", teacher: savedTeacher });
    } catch (error) {
      console.log({error})
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // PUT /updateteacher/:id - Update teacher information (only accessible by admin teachers)
  router.post("/updateteacher/:id", isAdmin, async (req, res) => {
    try {
  
      const teacherId = req.params.id; // Get the teacher ID from the request parameters
      addLog(`Teacher updated: ${teacherId}`, userId);
      
      // Find and update the teacher by their ID
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        {
          $set: req.body, // Use the request body to update teacher details
        },
        { new: true } // Return the updated teacher
      );
  
      if (!updatedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      return res.status(200).json({ message: "Teacher information updated successfully", teacher: updatedTeacher });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  // DELETE /deleteteacher/:id - Delete a teacher (only accessible by admin teachers)
  router.get("/deleteteacher/:id", isAdmin, async (req, res) => {
    try {
  
      const teacherId = req.params.id; // Get the teacher ID from the request parameters
      // addLog(`Teacher deleted: ${teacherId}`, userId);
  
      // Find and remove the teacher by their ID
      const deletedTeacher = await Teacher.findByIdAndRemove(teacherId);
  
      if (!deletedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  
  // POST /createstudent - Create a new student (only accessible by admin teachers)
  router.post("/createstudent", isAdmin, async (req, res) => {
    try {
  
      // Create a new student using the data from the request body
      const { name, enrollment_no, scholar_no, email, phone_no, branch, section, batch, password, subjects } = req.body;
  
      const newStudent = new Student({
        name,
        enrollment_no,
        scholar_no,
        email,
        phone_no,
        branch,
        section,
        batch,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
        subjects,
      });
      // addLog(`Student created: ${name}`, userId);
  
      // Save the new student to the database
      const savedStudent = await newStudent.save();
  
      return res.status(201).json({ message: "Student created successfully", student: savedStudent });
    } catch (error) {
      console.log({error})
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // POST /updatestudent - Update student information
router.post('/updatestudent/:id', isAdmin, async (req, res) => {
    try {

      // Get the student ID from the request body
      const studentId = req.params.id;
  
      if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required to update student information' });
      }
  
      // Get the updated student data from the request body
      // const updatedData = req.body.updatedData;
  
      // if (!updatedData) {
      //   return res.status(400).json({ message: 'Updated student data is required' });
      // }
      // addLog(`Student updated: ${studentId}`, userId);

      // Find the student by ID and update the specified fields
      const updatedStudent = await Student.findByIdAndUpdate(studentId,
        {
          $set: req.body, // Use the request body to update teacher details
        },
        { new: true } 
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      return res.status(200).json({ message: 'Student information updated successfully', updatedStudent });
    } catch (error) {
      console.error('Error updating student information:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  // DELETE /deletestudent/:id - Delete a student (only accessible by admin teachers)
  router.get("/deletestudent/:id", isAdmin, async (req, res) => {
    try {
  
      const studentId = req.params.id; // Get the student ID from the request parameters
      addLog(`Student deleted: ${studentId}`, userId);

      // Find and remove the student by their ID
      const deletedStudent = await Student.findByIdAndRemove(studentId);
  
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });


// GET /allsubjects - Retrieve all subjects with teacher details
router.get('/allsubjects', isAdmin, async (req, res) => {
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

    // Find all subjects and populate the teacher details
    const subjects = await Subject.find();


    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: 'No subjects found' });
    }

    // console.log(subjects)
  const subjectsWithTeacherDetails = await Promise.all(
    subjects.map(async (subject) => {
      const teacher = await Teacher.findById(subject.teacher_id);
      return {
        subject_id: subject._id,
        subject_name: subject.subject_name,
        course_code: subject.course_code,
        branch: subject.branch,
        section: subject.section,
        batch: subject.batch,
        teacher: {
          teacher_id: teacher.teacher_id,
          name: teacher.name,
          email: teacher.email,
          phone_no: teacher.phone_no,
        },
        attendance_date: subject.attendance_date,
        day: subject.day,
      };
    })
  );
  // console.log(subjectsWithTeacherDetails)

    return res.status(200).json({ message: subjectsWithTeacherDetails });
  } catch (error) {
    console.error('Error fetching subjects with teacher details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /allstudents - Retrieve all students with subjects and teacher details
router.get('/allstudents', isAdmin, async (req, res) => {
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
    // Find all students
    const students = await Student.find();

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    // Map students and get their subjects and teacher details
    const studentsWithSubjectsAndTeachers = await Promise.all(
      students.map(async (student) => {
        const subjects = await Subject.find({ subject_id: { $in: student.subjects.map(sub => sub.subject_id) } }).populate('teacher_id');
        
        const studentSubjects = subjects.map(subject => ({
          subject_id: subject.subject_id,
          subject_name: subject.subject_name,
          course_code: subject.course_code,
          teacher: {
            teacher_id: subject.teacher_id.teacher_id,
            name: subject.teacher_id.name,
            email: subject.teacher_id.email,
            phone_no: subject.teacher_id.phone_no,
          },
        }));
        
        return {
          name: student.name,
          enrollment_no: student.enrollment_no,
          scholar_no: student.scholar_no,
          email: student.email,
          phone_no: student.phone_no,
          branch: student.branch,
          section: student.section,
          batch: student.batch,
          subjects: studentSubjects,
        };
      })
    );

    return res.status(200).json({ message: studentsWithSubjectsAndTeachers });
  } catch (error) {
    console.error('Error fetching students with subjects and teacher details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// GET /allteachers - Retrieve all teachers with their subjects
router.get('/allteachers', isAdmin,getallteacher);

// GET /complaints - Retrieve all complaints
router.get('/allcomplaints', isAdmin, async (req, res) => {
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
});


// create a api in which csv file uploaded to create subjects in bulk
router.post("/createsubjectbulk", isAdmin, async (req, res) => {
  try {
    // Create a new subject using the data from the request body
    const { subjects } = req.body;
    const newSubjects = [];
    for(let i=0; i<subjects.length; i++){
      const { subject_name, course_code, branch, section, batch,  teacher_id, day } = subjects[i];
      const lecture_dates = [];
      const today = new Date();
      // from todays date run a loop till academic calander last date and assign the dates to lecture_dates array in which days match with the day of the week
      const academicCalander = await AcademicCalander.findOne({academic_year: today.getFullYear()});
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const lastDate = academicCalander[academicCalander.length-1].date;  
      while(todayDate <= lastDate){
        // if todayDate is holiday then don't add that day in lecture_dates
        const holiday = academicCalander.find(d => d.date === todayDate);
        if(holiday){
          todayDate.setDate(todayDate.getDate() + 1);
          continue;
        }
        // if todayDate.getDay()  find in array day where array day contain objects {nameof day, count of lectures} has and push to lecture_dates
        const dayObj = day.find(d => d.name === todayDate.getDay());
        
        if(dayObj){
          lecture_dates.push({date: todayDate, count: dayObj.count});
        }

        todayDate.setDate(todayDate.getDate() + 1);
      }

      const newSubject = new Subject({
        subject_name,
        course_code,
        branch,
        section,
        batch,
        teacher_id,
        lecture_dates,
        day
      });
      newSubjects.push(newSubject);
    }
    const savedSubjects = await Subject.insertMany(newSubjects);
    return res.status(201).json({ message: "Subject created successfully", subject: savedSubjects });
  } catch (error) {
    console.log({error})
    return res.status(500).json({ message: "Internal server error" });
  }
});

// create a api in which csv file uploaded to create teacher in bulk
router.post("/createteacherbulk", isAdmin, async (req, res) => {
  try {
    // Create a new teacher using the data from the request body
    const { teachers } = req.body;
    const newTeachers = [];
    for(let i=0; i<teachers.length; i++){
      const { teacher_id, name, email, phone_no, subjects, password } = teachers[i];
      const newTeacher = new Teacher({
        teacher_id,
        name,
        email,
        phone_no,
        admin_role: "Teacher",
        subjects,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
      });
      newTeachers.push(newTeacher);
    }
    const savedTeachers = await Teacher.insertMany(newTeachers);
    return res.status(201).json({ message: "Teacher created successfully", teacher: savedTeachers });
  } catch (error) {
    console.log({error})
    return res.status(500).json({ message: "Internal server error" });
  }
});

// create a api in which csv file uploaded to create students in bulk
router.post("/createstudentbulk", isAdmin, async (req, res) => {
  try {
    // Create a new student using the data from the request body
    const { students } = req.body;
    const newStudents = [];
    for(let i=0; i<students.length; i++){
      const { name, enrollment_no, scholar_no, email, phone_no, branch, section, batch, password, subjects } = students[i];
      const newStudent = new Student({
        name,
        enrollment_no,
        scholar_no,
        email,
        phone_no,
        branch,
        section,
        batch,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
        subjects,
      });
      newStudents.push(newStudent);
    }
    const savedStudents = await Student.insertMany(newStudents);
    return res.status(201).json({ message: "Student created successfully", student: savedStudents });
  } catch (error) {
    console.log({error})
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;