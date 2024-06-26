const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Teacher = require("../Model/teacherSchema");
const isAdmin = require("../Middleware/checkadmin");
const Subject = require("../Model/subjectSchema");
const Student = require("../Model/studentSchema");
const AcademicCalander = require("../Model/calanderSchema");
const addLog = require('../Controller/logs');
const Complaint = require("../Model/complaintSchema");



const createteacher=async (req, res) => {
    try {
      const userId = req.user_id; // You should have this information in your authentication middleware
  
  
      // Create a new teacher using the data from the request body
      const { teacher_id, name, email, faculty,department , phone_no, subjects, password } = req.body;

      if (!teacher_id || !name || !email || !phone_no || !subjects || !password || !faculty || !department) {
        return res.status(400).json({ message: "Please provide all required information" });
      }
  
      const newTeacher = new Teacher({
        teacher_id,
        name,
        email,
        phone_no,
        admin_role: "teacher",
        designation: "teacher",
        subjects,
        faculty,
        department,
        password: await bcrypt.hash(password, 10), // Encrypt the password before saving
      });
      
      // addLog(`Teacher created: ${teacher_id}`, userId);

      // Save the new teacher to the database
      const savedTeacher = await newTeacher.save();
      // for all subject_id of subjects in subjects array update teacher_id in teacher_id if subject permissions is write in subjects array

      for(let i=0; i<subjects.length; i++){
        if(subjects[i].permission === "write"){
          const updatedSubject = await Subject.findByIdAndUpdate(
            subjects[i].subject_id,
            {
              $set: { teacher_id: savedTeacher._id }, // Use the request body to update teacher details
            },
            { new: true } // Return the updated teacher
          );
        }
      }
      addLog(`Teacher created: ${teacher_id}`, userId);
      
      return res.status(201).json({ message: "Teacher created successfully", teacher: savedTeacher });
    } catch (error) {
      console.log({error})
      return res.status(500).json({ message: "Internal server error" });
    }
  }

const update_teacher_by_id=async (req, res) => {
    try {
      // console.log(req.params.id,req.body)
      const teacherId = req.params.id; // Get the teacher ID from the request parameters
      // addLog(`Teacher updated: ${teacherId}`, userId);
      
      // Find and update the teacher by their ID
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        {
          $set: req.body, // Use the request body to update teacher details
        },
        { new: true } // Return the updated teacher
      );

      // req.body has subjects array and teacher_id then update teacher_id in subject schema for all subject_id in subjects array with write permission
      if(req.body.subjects){
        for(let i=0; i<req.body.subjects.length; i++){
          if(req.body.subjects[i].permission === "write"){
            const updatedSubject = await Subject.findByIdAndUpdate(
              req.body.subjects[i].subject_id,
              {
                $set: { teacher_id: teacherId }, // Use the request body to update teacher details
              },
              { new: true } // Return the updated teacher
            );
          }
        }
      }
  
      if (!updatedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      addLog(`Teacher updated: ${teacherId}`, userId);
  
      return res.status(200).json({ message: "Teacher information updated successfully", teacher: updatedTeacher });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

const delete_teacher_by_id= async (req, res) => {
    try {
  
      const teacherId = req.params.id; // Get the teacher ID from the request parameters
      // addLog(`Teacher deleted: ${teacherId}`, userId);
  
      // Find and remove the teacher by their ID
      const deletedTeacher = await Teacher.findByIdAndRemove(teacherId);
  
      if (!deletedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      addLog(`Teacher deleted: ${teacherId}`, userId);
  
      return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

const all_teachers = async (req, res) => {
    try {
      const allTeachers = await Teacher.find();
      // console.log({allTeachers});   
      res.status(200).json({ message: allTeachers });
    } catch (error) {
      console.error('Error fetching teachers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  
}

module.exports ={createteacher,update_teacher_by_id,delete_teacher_by_id,all_teachers};