const express = require("express");
const router = express.Router();
const Student = require("../Model/studentSchema");
const Subject = require("../Model/subjectSchema");
const Teacher = require("../Model/teacherSchema");
const isauthenticated = require("../Middleware/authenticated");

router.get("/allstudents",isauthenticated,  async (req, res) => {
    try {

        const teacher = await Teacher.findById(req.user_id);
        
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (teacher.admin_role === "teacher" ) {
            return res.status(403).json({ message: "Forbidden: Access denied for non-academic head teachers" });
        }

        const user_role=req.user_role;
        // admin role start with cc then
        // CC-department-branch-section
        // parse this
        const department = user_role.split("-")[1];
        const branch = user_role.split("-")[2];
        const section = user_role.split("-")[3];
        const thisyear= new Date().getFullYear();
        const year = user_role.split("-")[4] - thisyear - "0";

        
        if (user_role.startsWith("CC")) {
            const students = await Student.find({ department, branch, section, year });
            return res.status(200).json({ students });            
        }
        
        // get all students details with subjects details
        const students = await Student.find({}).populate({ path: "subjects.subject_id", model: Subject , select:["subject_name","course_code","section","branch","batch","class_name","lecture_dates"] });
        return res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/allsubjectswithallstudent" ,isauthenticated, async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user_id);
        
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (teacher.admin_role === "teacher" ) {
            return res.status(403).json({ message: "Forbidden: Access denied for non-academic head teachers" });
        }

        const user_role=teacher.admin_role;
        // admin role start with cc then
        // CC-department-branch-section
        // parse this
        const department = user_role.split("-")[1];
        const branch = user_role.split("-")[2];
        const section = user_role.split("-")[3];
        const year = user_role.split("-")[4];

        var allsubject = await Subject.find();
        if (user_role.startsWith("CC")) {
            allsubject = await Subject.find({ department, branch, section, year });
        }

        // get all students details with subjects details
        var subject=[]
        for (let i = 0; i < allsubject.length; i++) {
            const students = await Student.find({ "subjects.subject_id": allsubject[i]._id });
            subject.push({subject_id:allsubject[i]._id,subject_name:allsubject[i].subject_name,course_code:allsubject[i].course_code,section:allsubject[i].section,branch:allsubject[i].branch,batch:allsubject[i].batch,class_name:allsubject[i].class_name,lecture_dates:allsubject[i].lecture_dates,students:students})
        }
        return res.status(200).json({ subject });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;