const express = require("express");
const router = express.Router();
const isauthenticated=require("../Middleware/authenticated");
const isTeacher=require("../Middleware/checkteacher");
const SubstituteTeacher=require("../Model/substituteTeacher");
const Teacher = require("../Model/teacherSchema");

router.post("/generaterequest",isauthenticated,isTeacher,async(req,res)=>{
    try{
        const {subjectId,assign_teacherId}=req.body;
        const teacherdetails=await Teacher.findById(req.user_id);

        // if subjects array does not contain this subject in their object in subject_id generate error
        if (!teacherdetails) {
            return res.status(400).json({ error: "Teacher not found" });
        }
        
        // console.log(teacherdetails,subjectId);

        var flag=0;

        for (let i = 0; i < teacherdetails.subjects.length; i++) {
            if (teacherdetails.subjects[i].subject_id === subjectId) {
                flag=1;
                break;
            }
        }

        if(flag==0){
            return res.status(400).json({ error: "Subject not found" });
        }



        if (!subjectId || !assign_teacherId) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        
        const assigned_teacher_details=await Teacher.findById(assign_teacherId);
        
        // if that subject is already assigned to that teacher generate error
        if (assigned_teacher_details.subjects.includes(subjectId)) {
            return res.status(400).json({ error: "Subject already assigned to that teacher" });
        }
        
        // assign subject to teacher
        assigned_teacher_details.subjects.push({ subject_id: subjectId, permission: "write" });
        await assigned_teacher_details.save();
        
        const created_teacherId=req.user_id;
        const newRequest=new SubstituteTeacher({created_teacherId,subjectId,assign_teacherId});
        await newRequest.save();
        res.status(200).json({message:"Request generated successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
});

// get all teachers 
router.get("/getallteachers",isauthenticated,isTeacher,async(req,res)=>{
    try{
        const teachers=await Teacher.find();
        res.status(200).json({teachers});
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});

// see all my requests
router.get("/viewmyrequest",isauthenticated,isTeacher,async(req,res)=>{
    try{
        const requests=await SubstituteTeacher.find({created_teacherId:req.user_id});
        res.status(200).json({requests});
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
});


module.exports = router;