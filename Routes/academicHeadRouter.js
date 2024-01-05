const express = require("express");
const router = express.Router();
const Student = require("../Model/studentSchema");
const Subject = require("../Model/subjectSchema");
const Teacher = require("../Model/teacherSchema");
const isauthenticated = require("../Middleware/authenticated");

router.get("/allstudents",  async (req, res) => {
    try {
        // const teacher = await Teacher.findById(req.user_id);

        // if (!teacher) {
        //     return res.status(404).json({ message: "Teacher not found" });
        // }
        // if (teacher.admin_role !== "AcademicHead") {
        //     return res.status(403).json({ message: "Forbidden: Access denied for non-academic head teachers" });
        // }

        // get all students details with subjects details
        const students = await Student.find({}).populate({ path: "subjects.subject_id", model: Subject , select:["subject_name","course_code","section","branch","batch","class_name","lecture_dates"] });
        return res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;