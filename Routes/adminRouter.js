const express = require("express");
const router = express.Router();
const isAdmin = require("../Middleware/checkadmin");
const {createsubject,changetimetable, addextralecture, updatesubjectdetails, deletesubjectbyid, all_subjects, resheduledate} = require("../Controller/CRUDsubject");
const { createteacher, update_teacher_by_id, delete_teacher_by_id, all_teachers } = require("../Controller/CRUDteacher");
const { create_student, update_student_by_id, delete_student_by_id, all_students } = require("../Controller/CRUDstudent");
const { all_complaints } = require("../Controller/Complaints");
const {getLeaveTeacherAttendance,  adminaddattendanceinallstudents,adminrejectleaveattendance} = require("../Controller/leaveTeacherAttendance");

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


router.post("/resheduledate", isAdmin, resheduledate);


// LeaveTeacherAttendance API
router.get('/allleaveteacherattendance', isAdmin,getLeaveTeacherAttendance );
router.get('/adminaddattendanceinallstudents/:id', isAdmin,adminaddattendanceinallstudents );
router.get('/adminrejectleaveattendance/:id', isAdmin,adminrejectleaveattendance );

const updateTodayAttendance = require("../Controller/UpdateTodayAttendance");
router.get("/recalaculatetodaysattendance", isAdmin, updateTodayAttendance);

module.exports = router;