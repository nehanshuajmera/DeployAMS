const LeaveTeacherAttendance = require('../Model/leaveTeacherAttendanceSchema');
const Teacher = require('../Model/teacherSchema');
const Subject = require('../Model/subjectSchema');
const addLog = require('../Controller/logs');
const Student = require('../Model/studentSchema');

const createLeaveTeacherAttendance = async (req, res) => {
    const { teacherId, subjectId, assign_teacherId, leaveDate, attendance } = req.body;

    // if that teacher was not assigned that subject error will be thrown
    const isTeacher = await Teacher.findOne({ _id: teacherId, subjectId });
    if (!isTeacher) return res.status(404).json({ message: "No teacher found" });
    // if that subject not have class no that day
    const classonleaveday= await Subject.findById(subjectId);
    const isclass=classonleaveday.lecture_dates?.find(d => d.date.getFullYear() === today.getFullYear() && d.date.getMonth() === today.getMonth() && d.date.getDate() === today.getDate());

    if(!isclass) return res.status(404).json({ message: "No class on that day" });

    const leaveTeacherAttendance = new LeaveTeacherAttendance({
        teacherId,
        subjectId,
        assign_teacherId,
        leaveDate,
        status: "pending",
        attendance,
    });
    try {
        const newLeaveTeacherAttendance = await leaveTeacherAttendance.save();
        res.status(200).json(newLeaveTeacherAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getLeaveTeacherAttendance = async (req, res) => {
    try { 
        const leaveTeacherAttendance = await LeaveTeacherAttendance.find();
        res.status(200).json(leaveTeacherAttendance);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getLeaveTeacherAttendanceByteacherId = async (req, res) => {
    // using middleware we get teacherId from token
    const teacherId = req.teacherId;
    try {
        const leaveTeacherAttendance = await LeaveTeacherAttendance.find({ teacherId });
        if (!leaveTeacherAttendance) return res.status(404).json({ message: "No leaveTeacherAttendance found" });
        res.status(200).json(leaveTeacherAttendance);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const getassignTeachersubjectallStudentsbydate = async (req, res) => {
    const { teacherId, subjectId } = req.body;
    const leaveDate = new Date();
    const assign_teacherId = req.teacherId;
    try {
        // if that teacher was not assigned that subject error will be thrown
        const isleaveTeacherAttendance = await LeaveTeacherAttendance.findOne({ teacherId, subjectId,assign_teacherId,leaveDate });
        if (!isleaveTeacherAttendance) return res.status(404).json({ message: "No leaveTeacherAttendance found" });

        const allstudents = await Student.find({ teacherId, subjectId });
        if (!allstudents) return res.status(404).json({ message: "No students found" });
        res.status(200).json(allstudents);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const markleaveattendanceontoday = async (req, res) => {
    const { teacherId, subjectId,assign_teacherId,attendance } = req.body;
    try {
        const today = new Date();
        // if that teacher was not assigned that subject error will be thrown
        const isleaveTeacherAttendance = await LeaveTeacherAttendance.findOne({ teacherId, subjectId,assign_teacherId,leaveDate:today });
        if (!isleaveTeacherAttendance) return res.status(404).json({ message: "No leaveTeacherAttendance found" });

        const allstudents = await Student.find({ teacherId, subjectId });
        if (!allstudents) return res.status(404).json({ message: "No students found" });

        const updatedleaveTeacherAttendance = await LeaveTeacherAttendance.findOneAndUpdate({ teacherId, subjectId,assign_teacherId,leaveDate }, { attendance }, { new: true });
        res.status(200).json(updatedleaveTeacherAttendance);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const adminaddattendanceinallstudents = async (req, res) => {
    const leaveAttendanceId  = req.params.id;
    try {
        // if that teacher was not assigned that subject error will be thrown
        const isleaveTeacherAttendance = await LeaveTeacherAttendance.findById(leaveAttendanceId);
        if (!isleaveTeacherAttendance) return res.status(404).json({ message: "No leaveTeacherAttendance found" });

        // find all the sudents that attendances are in leaveTeacherAttendance.attendance array with count and status
        const allstudents= await Student.find({_id:{$in:isleaveTeacherAttendance.attendance.map(a=>a.studentId)}});
        if (!allstudents) return res.status(404).json({ message: "No students found" });

        // by using allstudents get sudent by their id form allstudents array and update their subject array in which that subject is present and on that subject their is attendance array in new {date,count,status} will be added

        // for each student in allstudents array
        allstudents.forEach(async (student)=>{
            // find that subject in which that student is present
            const subject = student.subjects.find(s=>s.subject_id==isleaveTeacherAttendance.subjectId);
            // in this subject array push {date,count,status}
            subject.attendance.push({date:isleaveTeacherAttendance.leaveDate,count:isleaveTeacherAttendance.attendance.find(a=>a.studentId==student._id).count,status:isleaveTeacherAttendance.attendance.find(a=>a.studentId==student._id).status});
            // update that student
            await Student.findByIdAndUpdate(student._id,student,{new:true});
        })

        // mark leaveTeacherAttendance status as approved
        const updatedleaveTeacherAttendance = await LeaveTeacherAttendance.findByIdAndUpdate(leaveAttendanceId,{status:"approved"},{new:true});
        res.status(200).json(updatedleaveTeacherAttendance);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const adminrejectleaveattendance = async (req, res) => {
    const leaveAttendanceId  = req.params.id;
    try {
        // if that teacher was not assigned that subject error will be thrown
        const isleaveTeacherAttendance = await LeaveTeacherAttendance.findById(leaveAttendanceId);
        if (!isleaveTeacherAttendance) return res.status(404).json({ message: "No leaveTeacherAttendance found" });

        // mark leaveTeacherAttendance status as approved
        const updatedleaveTeacherAttendance = await LeaveTeacherAttendance.findByIdAndUpdate(leaveAttendanceId,{status:"rejected"},{new:true});
        res.status(200).json(updatedleaveTeacherAttendance);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = {createLeaveTeacherAttendance,getLeaveTeacherAttendance,getLeaveTeacherAttendanceByteacherId,getassignTeachersubjectallStudentsbydate,markleaveattendanceontoday,adminaddattendanceinallstudents,adminrejectleaveattendance }