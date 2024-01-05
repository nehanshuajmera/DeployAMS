const SubstituteTeacher=require("../Model/substituteTeacher");
const Teacher = require("../Model/teacherSchema");

const removeAssignedSubject = async (req, res) => {
    try {
        // check all subsituteTeacher model and if flag if true then remove
        // that subject from that teacher
        const allRequests = await SubstituteTeacher.find({ flag: true });
        for (let i = 0; i < allRequests.length; i++) {
            const request = allRequests[i];
            const teacher = await Teacher.findById(request.assign_teacherId);
            const index = teacher.subjects.findIndex((subject) => subject.subject_id == request.subjectId);
            // request created_at time must be greater than 18 hours
            // console.log(Date.now() - request.created_at,18 * 60 * 60 * 1000);
            if (Date.now() - request.created_at < 18 * 60 * 60 * 1000) {
                continue;
            }

            if (index != -1) {
                teacher.subjects.splice(index, 1);
                await teacher.save();
            }
            // and make flag false
            request.flag = false;
            await request.save();
        }
        console.log({ message: "Subjects removed successfully" });

    } catch (error) {
        console.log(error);
        console.log({ message: "Internal server error" });
    }

}

module.exports = removeAssignedSubject