const express = require("express");
const router = express.Router();
const Student = require("../Model/studentSchema");
const Teacher = require("../Model/teacherSchema");
const Subject = require("../Model/subjectSchema");  
const isAdmin = require("../Middleware/checkadmin");
const addLog=require('../Controller/logs');

// create a api to combine subject and students by branch,section, batch
router.post("/combinesubjectandstudents",isAdmin, async (req, res) => {
    try {
        const { studentIds,subjectIds } = req.body;
        // console.log(studentIds,subjectIds);
        if (!studentIds || !subjectIds) {
            return res.status(400).json({ error: "Please enter all fields" });
        }

        const arrayofsubjects=subjectIds.map((subject)=>{
            return {subject_id:subject,attendance:[]};
        })

        // console.log(arrayofsubjects);

        // create a loop in which we will find the subject and push the student id in the subjects array
        studentIds.map(async (student) => {

            // if student already have that subject then don't push
            
            if(await Student.findOne({ _id: student, "subjects.subject_id": { $in: subjectIds } }))
            {
                return res.status(400).json({ error: "Student already have that subject" });
            }
            else{
                const studentupdate= await Student.updateOne({ _id: student }, { $push: { subjects: arrayofsubjects } });  
            }

        });

        addLog("Combine Student and Subject",req.user_id);
        return res.status(200).json({ message: "Successfully combined" });
       
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/combinesubjectandteacher", isAdmin, async (req, res) => {
    try {
        const { teacherId, subjectIds } = req.body;

        if (!teacherId || !subjectIds) {
            return res.status(400).json({ error: "Please enter all fields" });
        }

        const arrayofsubjects = subjectIds.map((subject) => {
            return { subject_id: subject, permission: "write" };
        });

        
        if (await Teacher.findOne({ _id: teacherId, "subjects.subject_id": { $in: subjectIds } })) {
            return res.status(400).json({ error: "Teacher already has that subject" });
        } else {
            const teacherupdate = await Teacher.updateOne(
                { _id: teacherId },
                { $push: { subjects: arrayofsubjects } }
            );
        }

        subjectIds.map(async (subject) => {
            const subjectupdate = await Subject.updateOne(
                { _id: subject },
                { teacher_id: teacherId  }
            );
        });

        addLog("Combine Teacher and Subject",req.user_id);
        return res.status(200).json({ message: "Successfully combined" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;