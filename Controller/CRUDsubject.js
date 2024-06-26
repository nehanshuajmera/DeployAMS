const Teacher = require("../Model/teacherSchema");
const Student = require("../Model/studentSchema");
const Subject = require("../Model/subjectSchema");
const AcademicCalander = require("../Model/calanderSchema");
const addLog=require('../Controller/logs');


const createsubject= async (req, res) => {
    try {
      // Create a new subject using the data from the request body
      const { subject_name, course_code, branch, section, batch, day,  department,class_name } = req.body;
       
      const lecture_dates = [];
      // const today = new Date();
      // const today = new Date("2024-01-01");
      // from todays date run a loop till academic calander last date and assign the dates to lecture_dates array in which days match with the day of the week
      // const academicCalander = await AcademicCalander.find();
      // const todayDate = new Date(today);
      // const lastDate = academicCalander[academicCalander.length -1 ].date;  

      const checkalreadycreated = await Subject.find({subject_name, course_code, branch, section, batch});
      if(checkalreadycreated.length>0){
        return res.status(400).json({ message: "Subject already created" });
      }

      // while(todayDate <= lastDate){
      //   // if todayDate is holiday then don't add that day in lecture_dates
      //   const date_curr = academicCalander.find(d => new Date(d.date).toDateString() === todayDate.toDateString());


      //   if(date_curr?.holiday){
      //     todayDate.setDate(todayDate.getDate() + 1);
      //     continue;
      //   }
      //   // console.log(date_curr)
      //   // if todayDate.getDay()  find in array day where array day contain objects {nameof day, count of lectures} has and push to lecture_dates
      //   const dayObj = day.find(d => d.name === date_curr.day);
       
      //   // console.log(dayObj)        
      //   if(dayObj){
      //     lecture_dates.push({date: date_curr.date, count: dayObj.count});
      //   }

      //   todayDate.setDate(todayDate.getDate() + 1);
      // }

      const newSubject = new Subject({
        subject_name,
        course_code,
        branch,
        section,
        batch,
        lecture_dates,
        department,class_name,
        day
      });
      

      addLog(`Subject created: ${subject_name}`,req.user_id)
  
      // Save the new subject to the database
      const savedSubject = await newSubject.save();
  
      return res.status(201).json({ message: "Subject created successfully", subject: savedSubject });
      // return res.status(201).json({ message: "Subject created successfully" });
    } catch (error) {
      console.error({error})
      return res.status(500).json({ message: "Internal server error" });
    }
}

const changetimetable=async (req, res) => {
    // to change timetable we have to change lecture_dates array in subject schema we have to recompute it but what if attendance is already taken we don't have to delete that lecture_dates array
    try {
    // const subjectId = req.params.id; // Get the subject ID from the request parameters
    // // const { day } = req.body;
    // // const today = new Date();
    // // // const today = new Date("2024-01-01");
    // // const academicCalander = await AcademicCalander.find();
    // // const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // // const lastDate = academicCalander[academicCalander.length-1].date;
    // // const lecture_dates = [];
    
    // // // we wil first assign old data of lecture_dates to new lecture_dates array before todays date
    // // const oldSubject = await Subject.findById(subjectId);
    // // const oldLectureDates = oldSubject.lecture_dates;
    // // const oldLectureDatesBeforeToday = oldLectureDates.filter(d => d.date < todayDate); 
    // // lecture_dates.push(...oldLectureDatesBeforeToday);

    // // while(todayDate <= lastDate){
    // //   // if todayDate is holiday then don't add that day in lecture_dates
    // //   const date_curr = academicCalander.find(d => new Date(d.date).toDateString() === todayDate.toDateString());

    // //   if(date_curr.holiday){
    // //     todayDate.setDate(todayDate.getDate() + 1);
    // //     continue;
    // //   }
    // //   // console.log(date_curr)
    // //   // if todayDate.getDay()  find in array day where array day contain objects {nameof day, count of lectures} has and push to lecture_dates
    // //   const dayObj = day.find(d => d.name === date_curr.day);
     
    // //   // console.log(dayObj)        
    // //   if(dayObj){
    // //     lecture_dates.push({date: date_curr.date, count: dayObj.count});
    // //   }

    // //   todayDate.setDate(todayDate.getDate() + 1);
    // // } 

    // // const updatedSubject = await Subject.findByIdAndUpdate(
    // //   subjectId,
    // //   {
    // //     $set: {lecture_dates, day}, // Use the request body to update subject details
    // //   },
    // //   { new: true } // Return the updated subject
    // // );  
    // return res.status(200).json({ message: "Subject updated successfully", subject: updatedSubject });
    return res.status(200).json({ message: "Timetable changed Function removed" });
  } catch (error) {
    console.error('Error updating subject:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const addextralecture=async (req, res) => {
    try{
      // push {date, count,cause:"Extra Class"} in lecture dates array
      // const subjectId = req.params.id; // Get the subject ID from the request parameters
      // const { date, count, cause } = req.body;
      // // convert this date and push all this data in lecture_dates array
      // const updateextralecture = await Subject.findByIdAndUpdate(
      //   subjectId,
      //   {
      //     $push: {lecture_dates: {date:new Date(date), count, cause}}, // Use the request body to update subject details
      //   },
      //   { new: true } // Return the updated subject
      // );

      // return res.status(200).json({ message: "Extra Lecture added successfully", subject: updateextralecture });
      return res.status(200).json({ message: "Extra Lecture Feature removed successfully" });
    }
    catch(error){
      return res.status(500).json({ message: "Internal server error" });
    }
 }


const updatesubjectdetails=async (req, res) => {
    try {
  
      const subjectId = req.params.id; // Get the subject ID from the request parameters

      // addLog({message:`Subject updated: ${subjectId}`, createdBy:req.user_id})
  
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
 
      addLog(`Subject updated: ${subjectId}`,req.user_id)
      return res.status(200).json({ message: "Subject updated successfully", subject: updatedSubject });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

const deletesubjectbyid= async (req, res) => {
    try {
      
      const subjectId = req.params.id; // Get the subject ID from the request parameters
      
      if (!subjectId) {
        return res.status(400).json({ message: "Subject ID is required to delete a subject" });
      }

      // addLog(`Subject deleted: ${subjectId}`, userId);
      // Find and remove the subject by its ID
      const deletedSubject = await Subject.findByIdAndRemove(subjectId);
      addLog(`Subject deleted: ${subjectId}`, req.user_id)
      return res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }


const all_subjects=async (req, res) => {
    try {
        
      // Find all subjects and populate the teacher details
      const user_id=req.user_id;
      const teacher = await Teacher.findById(user_id);
      var subjects;
      if(teacher.admin_role==="HOD"){
         subjects = await Subject.find({department:teacher.department});
      }
      else{
         subjects = await Subject.find();  
      }
  
      if (!subjects || subjects.length === 0) {
        return res.status(201).json({ message: [],error:"No subjects found"});
      }
  
      // console.log(subjects)
    // const subjectsWithTeacherDetails = await Promise.all(
    //   subjects.map(async (subject) => {
    //     const teacher = await Teacher.findById(subject.teacher_id);
    //     return {
    //       subject_id: subject._id,
    //       subject_name: subject.subject_name,
    //       course_code: subject.course_code,
    //       branch: subject.branch,
    //       section: subject.section,
    //       batch: subject.batch,
    //       teacher: {
    //         teacher_id: teacher.teacher_id,
    //         name: teacher.name,
    //         email: teacher.email,
    //         phone_no: teacher.phone_no,
    //       },
    //       attendance_date: subject.attendance_date,
    //       day: subject.day,
    //     };
    //   })
    // );
    // // console.log(subjectsWithTeacherDetails)

    return res.status(200).json({ message: subjects });
      // return res.status(200).json({ message: subjectsWithTeacherDetails });
    } catch (error) {
      console.error('Error fetching subjects with teacher details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


const resheduledate = async (req, res) => {
    try {
      // change all subject lecture_dates array date who have curr_date to new date
      // const { curr_date, new_date  } = req.body;
      // // check if any student has attendance of curr_date then don't change date
      // const students = await Student.find();
      // const studentsId = students.map(s => s._id);
      // // if any student has attendance of curr_date then throw error
      // const attendance = await Attendance.find({student_id: {$in: studentsId}, date: curr_date});
      // if(attendance.length>0){
      //   return res.status(400).json({ message: "Attendance already taken for this date" });
      // }
      // // if no student has attendance of curr_date then change date

      // const subjects = await Subject.find();
      // const subjectsId = subjects.map(s => s._id);
      // const updatedSubjects = await Subject.updateMany(
      //   {_id: {$in: subjectsId}, "lecture_dates.date": curr_date},
      //   {$set: {"lecture_dates.$.date": new_date}}
      // );
      return res.status(200).json({ message: "Lecture date rescheduled Function Removed successfully" });
    }
    catch(error){
      return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {createsubject,changetimetable,addextralecture,updatesubjectdetails,deletesubjectbyid,all_subjects,resheduledate};