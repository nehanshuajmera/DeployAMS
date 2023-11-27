const express = require("express");
const router = express.Router();
const isAdmin = require("../Middleware/checkadmin");
const {createsubject,changetimetable, addextralecture, updatesubjectdetails, deletesubjectbyid, all_subjects} = require("../Controller/CRUDsubject");
const { createteacher, update_teacher_by_id, delete_teacher_by_id, all_teachers } = require("../Controller/CRUDteacher");
const { create_student, update_student_by_id, delete_student_by_id, all_students } = require("../Controller/CRUDstudent");
const { all_complaints } = require("../Controller/Complaints");

// Subject API
router.get('/allsubjects', isAdmin, all_subjects);

router.post("/createsubject",isAdmin, createsubject);

router.post("/changesubjecttimetable/:id", isAdmin, changetimetable);

router.post("/extralecture/:id", isAdmin, addextralecture)

router.post("/updatesubject/:id", isAdmin,updatesubjectdetails );

router.delete("/deletesubject/:id", isAdmin,deletesubjectbyid );


// TEACHER API
router.get('/allteachers', isAdmin,all_teachers);

router.post("/createteacher", isAdmin, createteacher);

router.post("/updateteacher/:id", isAdmin,update_teacher_by_id );

router.get("/deleteteacher/:id", isAdmin,delete_teacher_by_id);
   
  
// Student API
router.get('/allstudents', isAdmin, all_students);

router.post("/createstudent", isAdmin,create_student);
  
router.post('/updatestudent/:id', isAdmin,update_student_by_id);
  
router.get("/deletestudent/:id", isAdmin, delete_student_by_id);


// Complaints API
router.get('/allcomplaints', isAdmin,all_complaints );


// // create a api in which csv file uploaded to create subjects in bulk
// router.post("/createsubjectbulk", isAdmin, async (req, res) => {
//   try {
//     // Create a new subject using the data from the request body
//     const { subjects } = req.body;
//     const newSubjects = [];
//     for(let i=0; i<subjects.length; i++){
//       const { subject_name, course_code, branch, section, batch,  teacher_id, day } = subjects[i];
//       const lecture_dates = [];
//       const today = new Date();
//       // from todays date run a loop till academic calander last date and assign the dates to lecture_dates array in which days match with the day of the week
//       const academicCalander = await AcademicCalander.findOne({academic_year: today.getFullYear()});
//       const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//       const lastDate = academicCalander[academicCalander.length-1].date;  
//       while(todayDate <= lastDate){
//         // if todayDate is holiday then don't add that day in lecture_dates
//         const holiday = academicCalander.find(d => d.date === todayDate);
//         if(holiday){
//           todayDate.setDate(todayDate.getDate() + 1);
//           continue;
//         }
//         // if todayDate.getDay()  find in array day where array day contain objects {nameof day, count of lectures} has and push to lecture_dates
//         const dayObj = day.find(d => d.name === todayDate.getDay());
        
//         if(dayObj){
//           lecture_dates.push({date: todayDate, count: dayObj.count});
//         }

//         todayDate.setDate(todayDate.getDate() + 1);
//       }

//       const newSubject = new Subject({
//         subject_name,
//         course_code,
//         branch,
//         section,
//         batch,
//         teacher_id,
//         lecture_dates,
//         day
//       });
//       newSubjects.push(newSubject);
//     }
//     const savedSubjects = await Subject.insertMany(newSubjects);
//     return res.status(201).json({ message: "Subject created successfully", subject: savedSubjects });
//   } catch (error) {
//     console.log({error})
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // create a api in which csv file uploaded to create teacher in bulk
// router.post("/createteacherbulk", isAdmin, async (req, res) => {
//   try {
//     // Create a new teacher using the data from the request body
//     const { teachers } = req.body;
//     const newTeachers = [];
//     for(let i=0; i<teachers.length; i++){
//       const { teacher_id, name, email, phone_no, subjects, password } = teachers[i];
//       const newTeacher = new Teacher({
//         teacher_id,
//         name,
//         email,
//         phone_no,
//         admin_role: "Teacher",
//         subjects,
//         password: await bcrypt.hash(password, 10), // Encrypt the password before saving
//       });
//       newTeachers.push(newTeacher);
//     }
//     const savedTeachers = await Teacher.insertMany(newTeachers);
//     return res.status(201).json({ message: "Teacher created successfully", teacher: savedTeachers });
//   } catch (error) {
//     console.log({error})
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // create a api in which csv file uploaded to create students in bulk
// router.post("/createstudentbulk", isAdmin, async (req, res) => {
//   try {
//     // Create a new student using the data from the request body
//     const { students } = req.body;
//     const newStudents = [];
//     for(let i=0; i<students.length; i++){
//       const { name, enrollment_no, scholar_no, email, phone_no, branch, section, batch, password, subjects } = students[i];
//       const newStudent = new Student({
//         name,
//         enrollment_no,
//         scholar_no,
//         email,
//         phone_no,
//         branch,
//         section,
//         batch,
//         password: await bcrypt.hash(password, 10), // Encrypt the password before saving
//         subjects,
//       });
//       newStudents.push(newStudent);
//     }
//     const savedStudents = await Student.insertMany(newStudents);
//     return res.status(201).json({ message: "Student created successfully", student: savedStudents });
//   } catch (error) {
//     console.log({error})
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });


module.exports = router;