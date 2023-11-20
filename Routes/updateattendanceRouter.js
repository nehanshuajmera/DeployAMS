const router = require('express').Router();
const Teacher = require("../Model/teacherSchema");
const Subject = require("../Model/subjectSchema");
const scheduleRequest = require("../Model/scheduleRequestSchema");
const Student = require("../Model/studentSchema");
const isauthenticated = require("../Middleware/authenticated");
const addLog = require('../Controller/logs');
const isAdmin = require("../Middleware/checkadmin");

// create a api /asktoupdate/:id in which id of subject was passed and date on which attendance was updated was passed by teacher and when admin give permission to update attendance then teacher can update attendance of that subject on that date
router.post("/asktoupdate/:id",isauthenticated,async(req,res)=>{
    try{
        const teacher = await Teacher.findById(req.user.user_id);
        const subject = await Subject.findById(req.params.id);
        if(!teacher){
            return res.status(401).json({message:"Invalid Teacher ID"});
        }
        if(!subject){
            return res.status(401).json({message:"Invalid Subject ID"});
        }
        if(!teacher.subjects.includes(req.params.id)){
            return res.status(401).json({message:"You are not teaching this subject"});
        }
        const date = req.body.date;
        if(!date){
            return res.status(401).json({message:"Date not provided"});
        }
        const date1 = new Date(date);
        const date2 = new Date();
        if(date1.getTime() > date2.getTime()){
            return res.status(401).json({message:"You cannot update attendance of future"});
        }
        const request = new scheduleRequest({
            teacher:req.user.user_id,
            subject:req.params.id,
            proposedDateTime:date,
            typeOfRequest:"update",
            status:"pending",
        });
        await request.save();
        // addLog(req.user.user_id,`Teacher ${teacher.name} asked to update attendance of subject ${subject.name} on date ${date}`);
        return res.status(200).json({message:"Request sent"});
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
});

//  create a api for admin to see all the request of teacher to update attendance
router.get("/viewallrequest",isAdmin,async(req,res)=>{
    try{
        const requests = await scheduleRequest.find({typeOfRequest:"update"}).populate({path:"teacher",model:"Teacher",select:"name"}).populate({path:"subject",model:"Subject",select:"name"}).sort({createdAt:-1});
        return res.status(200).json({requests});
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
});

// create a api for admin to accept or reject the request of teacher to update attendance
router.post("/acceptorreject/:id",isAdmin,async(req,res)=>{
    try{
        const request = await scheduleRequest.findById(req.params.id);
        if(!request){
            return res.status(401).json({message:"Invalid Request ID"});
        }
        // if(request.typeOfRequest !== "update"){
        //     return res.status(401).json({message:"Invalid Request Type"});
        // }
        // if(request.status !== "pending"){
        //     return res.status(401).json({message:"Request already processed"});
        // }
        if(req.body.status === "accepted"){
            request.status = "accepted";
            await request.save();
            // addLog(req.user.user_id,`Admin accepted the request of teacher ${request.teacher.name} to update attendance of subject ${request.subject.name} on date ${request.proposedDateTime}`);
            return res.status(200).json({message:"Request accepted"});
        }
        else if(req.body.status === "rejected"){
            request.status = "rejected";
            await request.save();
            // addLog(req.user.user_id,`Admin rejected the request of teacher ${request.teacher.name} to update attendance of subject ${request.subject.name} on date ${request.proposedDateTime}`);
            return res.status(200).json({message:"Request rejected"});
        }
        else{
            return res.status(401).json({message:"Invalid status"});
        }
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
});

// create a api for teacher to update attendance of subject on date
router.post("/updateattendance/:id",isauthenticated,async(req,res)=>{
    try{
        const teacher = await Teacher.findById(req.user.user_id);
        const subject = await Subject.findById(req.params.id);
        if(!teacher){
            return res.status(401).json({message:"Invalid Teacher ID"});
        }
        if(!subject){
            return res.status(401).json({message:"Invalid Subject ID"});
        }
        if(!teacher.subjects.includes(req.params.id)){
            return res.status(401).json({message:"You are not teaching this subject"});
        }
        const date = req.body.date;
        if(!date){
            return res.status(401).json({message:"Date not provided"});
        }
        const date1 = new Date(date);
        const date2 = new Date();
        if(date1.getTime() > date2.getTime()){
            return res.status(401).json({message:"You cannot update attendance of future"});
        }
        const studentIDs = req.body.studentIDs;
        if(!studentIDs){
            return res.status(401).json({message:"Attendance not provided"});
        }
        if(studentIDs.length === 0){
            return res.status(401).json({message:"Attendance cannot be empty"});
        }
        const request = await scheduleRequest.findOne({teacher:req.user.user_id,subject:req.params.id,proposedDateTime:date});
        if(!request){
            return res.status(401).json({message:"You have not been given permission to update attendance of this subject on this date"});
        }
        if(request.status !== "accepted"){
            return res.status(401).json({message:"You have not been given permission to update attendance of this subject on this date"});
        }

        const isclasstoday= await Subject.findOne({ _id: req.params.id, lecture_dates: { $elemMatch: { date: date } } });
        if (!isclasstoday) {
            return res.status(403).json({ message: "No Class" });
        }

        for (const studentData of studentIDs) {
            const studentId = studentData.studentid;
            const count = studentData.count;
            if (count>isclasstoday.count){
              return res.status(403).json({ message: "Attendance limit exceeded" });
            }
            const student = await Student.findOne({ _id: studentId });
      
            if(!student){
              return res.status(404).json({ message: "Student not found" });
            }
            // console.log({student})
      
            if (student) {
              // Find the subject in the student's subjects array
              const subjectIndex = student.subjects.findIndex(sub => sub.subject_id.equals(subject._id));
              // console.log({subjectIndex})
              // console.log(subject.day)
              
              if (subjectIndex !== -1) {
                const subjectAttendance = student.subjects[subjectIndex].attendance;
      
                // Check if the attendance assigned is less than or equal to the subject's count
                  if(subjectAttendance.length){
                    const lastdate=subjectAttendance[subjectAttendance.length-1].date;
                    if(lastdate.getFullYear() === today.getFullYear() &&lastdate.getMonth() === today.getMonth() &&lastdate.getDate() === today.getDate()){  
                      subjectAttendance.pop();
                    } 
                  }
                  subjectAttendance.push({ date: new Date(), count, cause:'' });
                  await student.save();
              }
            }
          }
          
        //   addLog(`Student attendance updated for subject: ${subject._id}`, teacherId);      
        return res.status(200).json({ message: 'Attendance updated successfully' });
      
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
});



module.exports = router;