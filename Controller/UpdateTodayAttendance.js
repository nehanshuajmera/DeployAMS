const Subject = require("../Model/subjectSchema");
const AcademicCalander = require("../Model/calanderSchema");

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const updateTodayAttendance = async () => {
    // take all the subjects and academic calendar and if there is class of that subject today then add {date, count, cause:""} on  lecture_dates array of subject schema. class today means not holiday and there is class of that subject according to day array of subject schema.
    const SubjectList = await Subject.find();
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const todayDate = new Date(date);

    console.log("Today's Date :", todayDate);
    
    const date_curr = await AcademicCalander.findOne({ date: todayDate });

    console.log("Today's Status :", date_curr);

    if (!date_curr) {
        console.log("Update failed. Today's date not found in academic calendar");
        return "Update failed. Today's date not found in academic calendar";
    }

    
    // console.log(" Today's Status :", date_curr + " " + todayDate);
    const day = daysOfWeek[today.getDay()];

    if (date_curr.holiday) {
        return "Today is a holiday";
    }

    const todayLectures = SubjectList.filter(subject => subject.day.find(d => d.name === day));
    todayLectures.forEach(subject => {
        const lecture = subject.lecture_dates.find(l => new Date(l.date).toDateString() === todayDate.toDateString());
        // console.log("Lecture :", lecture);
        if (!lecture) {
            subject.lecture_dates.push({ date: todayDate, count: subject.day.find(d => d.name === day).count, cause: "" });
            // console.log("Lecture added for ", subject.subject_name, { date: todayDate, count: subject.day.find(d => d.name === day).count, cause: "" });
        }
    });

    // Save each subject separately or use updateMany to save all at once
    await Promise.all(SubjectList.map(subject => subject.save()));
    console.log("Today's attendance updated");  

    return "Today's attendance updated";
}

module.exports = updateTodayAttendance;
