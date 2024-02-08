const router = require('express').Router();
const Teacher = require("../Model/teacherSchema");
const Subject = require("../Model/subjectSchema");
const scheduleRequest = require("../Model/scheduleRequestSchema");
const Student = require("../Model/studentSchema");
const isauthenticated = require("../Middleware/authenticated");
const addLog = require('../Controller/logs');
const isAdmin = require("../Middleware/checkadmin");
const isTeacher = require('../Middleware/checkteacher');

router.post("/asktoupdate/:id",isauthenticated,isTeacher ,async(req,res)=>{
    try{
        const teacher = await Teacher.findById(req.user_id);
        const subject = await Subject.findById(req.params.id);
        
        // console.log(req.body)

        if(!teacher){
            return res.status(401).json({message:"Invalid Teacher ID"});
        }
        if(!subject){
            return res.status(401).json({message:"Invalid Subject ID"});
        }
        const date = req.body.date;
        if(!date){
            return res.status(401).json({message:"Date not provided"});
        }
        var date1 = new Date(date);
        // increase 5:30
        date1.setHours(date1.getHours() + 5);
        date1.setMinutes(date1.getMinutes() + 30);

        // console.log(date1)

        const date2 = new Date();
        if(date1.getTime() > date2.getTime()){
            return res.status(401).json({message:"You cannot update attendance of future"});
        }
        const request = new scheduleRequest({
            teacher:req.user_id,
            subject:req.params.id,
            proposedDateTime:date,
            typeOfRequest:"update",
            status:"pending"
        });
        await request.save();
        
        addLog(`Teacher ${teacher.name} asked to update attendance of subject ${subject.subject_name} on date ${date}`,req.user_id);

        return res.status(200).json({message:"Request sent"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});

// create a api for teacher to see all the request sent by him to update attendance
router.get("/viewmyrequest",isauthenticated,isTeacher,async(req,res)=>{
    try{
        const requests = await scheduleRequest
  .find({ teacher: req.user_id, typeOfRequest: "update" })
  .populate({ path: "subject", model: Subject, select:["subject_name","course_code","section","branch","batch","class_name"] })
//   .sort({ createdAt: -1 });


        return res.status(200).json({requests});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});

router.get("/viewmyrequestdetail/:id",isauthenticated,isTeacher,async(req,res)=>{
    try{
        const request = await scheduleRequest.findById(req.params.id);
        if(!request){
            return res.status(401).json({message:"Invalid Request ID"});
        }
        if(request.teacher.toString() !== req.user_id){
            return res.status(401).json({message:"You are not authorized to view this request"});
        }
        return res.status(200).json({request});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});


//  create a api for admin to see all the request of teacher to update attendance
router.get("/viewallrequest",isAdmin,async(req,res)=>{
    try{
        const requests = await scheduleRequest.find({typeOfRequest:"update"}).populate({path:"teacher",model:Teacher,select:"name"}).populate({path:"subject",model:Subject,select:["subject_name","course_code","section","branch","batch","class_name"]}).sort({createdAt:-1});
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
        if(request.status !== "pending"){
            return res.status(401).json({message:"Request already processed"});
        }

        if(req.body.status === "Accepted"){
            request.status = "approved";
            await request.save();
            addLog(`Admin accepted the request ${request._id}`,req.user_id);
            return res.status(200).json({message:"Request accepted"});
        }
        else if(req.body.status === "Rejected"){
            request.status = "denied";
            await request.save();
            addLog(`Admin rejected the request ${request._id}`,req.user_id);
            return res.status(200).json({message:"Request rejected"});
        }
        else{
            return res.status(401).json({message:"Invalid status"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});


// create a api for teacher to update attendance of subject on date
router.post("/updateattendancebypermission/:id", isauthenticated, isTeacher, async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.user_id);
      const request = await scheduleRequest.find({ teacher: req.user_id, typeOfRequest: "update",_id:req.params.id, status: "approved" });
      
      // console.log(request);
      // console.log(request[0].subject);
      if(!request){
          return res.status(401).json({message:"Invalid Request ID"});
      }
      const date2 = new Date();

    
      // if(request.updated_at - date2 > 0){
      //   return res.status(401).json({ message: "Request already processed" });
      // }

      const subject = await Subject.findById(request[0].subject);
 
      // console.log(subject);

      if (!teacher) {
        return res.status(401).json({ message: "Invalid Teacher ID" });
      }
  
      if (!subject) {
        return res.status(401).json({ message: "Invalid Subject ID" });
      }
  
    //   if (!teacher.subjects.includes(req.params.id)) {
    //     return res.status(401).json({ message: "You are not teaching this subject" });
    //   }
  
      const date = request[0].proposedDateTime;
      // console.log(date);  
      const date1 = new Date(date);
      

      if (date1.getTime() > date2.getTime()) {
        return res.status(401).json({ message: "You cannot update attendance of the future" });
      }

      // console.log(date1)
      // console.log(req.body);

      const studentIDs = req.body.studentIDs;
      // console.log(studentIDs);
      if (!studentIDs) {
        return res.status(401).json({ message: "Attendance not provided" });
      }
  
      if (studentIDs.length === 0) {
        return res.status(401).json({ message: "Attendance cannot be empty" });
      }

      const classonthatdate =subject.lecture_dates.find(d => d.date.getFullYear() === date1.getFullYear() && d.date.getMonth() === date1.getMonth() && d.date.getDate() === date1.getDate());

      // console.log(subject,classonthatdate,date1);

      if (!classonthatdate) {
        return res.status(401).json({ message: "No class on that date" });
      }
  
      // Update attendance logic
      for (const studentData of studentIDs) {
        const studentId = studentData.studentid;
        const count = studentData.count;
  
        // Additional validation can be added if needed
        if (classonthatdate.count < count) {
            return res.status(401).json({ message: "Attendance cannot be greater than the total number of classes" });
            }
  
        const student = await Student.findById(studentId);
 
        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }
  
        const subjectIndex = student.subjects.findIndex(sub => sub.subject_id.equals(subject._id));
  
        if (subjectIndex !== -1) {
          const subjectAttendance = student.subjects[subjectIndex].attendance;
  
          const attendanceIndex = subjectAttendance.findIndex(att => att.date.getFullYear() === date1.getFullYear() && att.date.getMonth() === date1.getMonth() && att.date.getDate() === date1.getDate());
  
          if (attendanceIndex !== -1) {
            subjectAttendance[attendanceIndex].count = count;
  
            if (count === 0) {
              subjectAttendance.splice(attendanceIndex, 1);
            }
          } else {
            if (count !== 0) {
              subjectAttendance.push({ date: new Date(date1), count, cause: date2.toDateString() +" Past Attendance" });
            }
          }
  
          await student.save();

          // expire the request
          request[0].status = "processed";
          await request[0].save();
        } else {
          return res.status(404).json({ message: "Student not found" });
        }
      }
      addLog(`Attendance updated for ${subject.subject_name} request Id ${req.params.id} on date ${date1}`,req.user_id);
  
      return res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (error) {
      console.error('Error updating attendance by permission:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;