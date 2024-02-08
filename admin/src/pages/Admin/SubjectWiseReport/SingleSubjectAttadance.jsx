import React, { useEffect, useState } from 'react'

export default function SingleSubjectAttadance({ subject, sub_id, start_date, end_date }) {

  const [LectureDates, setLectureDates] = useState(subject?.lecture_dates);

  useEffect(() => {
    // filter lecture dates based on start_date and end_date
    const filteredLectureDates = subject.lecture_dates.filter((date) => {
      const dateObj = new Date(date.date);
      return dateObj >= new Date(start_date) && dateObj <= new Date(end_date);
    });
    setLectureDates(filteredLectureDates);
  },[start_date,end_date])


    const convertDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
      };
    
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center mt-4">{subject?.branch}  {subject?.course_code} {subject?.subject_name} {subject?.section} {subject?.batch} {subject?.class_name} </h1>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Student Name</th>
            <th className="py-2 px-4 border">Enrollment No.</th>
            {LectureDates.length > 0 &&
              LectureDates.map((dates) => (
                <th key={dates._id} className="py-2 px-4 border">
                  {convertDate(dates.date)}
                </th>
              ))}
              <th className='py-2 px-4 border'>Attended Classes</th>
              <th className='py-2 px-4 border'>Total Classes</th>
              <th className='py-2 px-4 border'>Attendance Percentage</th>
          </tr>
        </thead>
        <tbody>
          {subject.students.map((student) => {
            let selectedsubject = student.subjects.find((subject) => subject.subject_id === sub_id);
            const formattedAttendance = selectedsubject.attendance.map((dates)=> convertDate(dates.date));

            return (
              <tr key={student._id}>
                <td className="py-2 px-4 border">{student.name}</td>
                <td className="py-2 px-4 border">{student.enrollment_no}</td>
                {LectureDates.length > 0 &&
              LectureDates.map((dates) => (
                <th key={dates._id} className="py-2 px-4 border">
                   {formattedAttendance.includes(convertDate(dates.date)) ? (
                            <td className='dataForStudents bg-green-500 '> present </td>
                          ) : (
                            <td className='dataForStudents bg-red-500 ' > Absent</td>
                          )
                          }
                </th>
              ))}
              <td className='py-2 px-4 border'>{selectedsubject.attendance.reduce((result,ele)=>(result+=ele.count),0)}</td>
              <td className='py-2 px-4 border'>{subject?.lecture_dates?.reduce((result,ele)=>(result+=ele.count),0)}</td>
              <td className='py-2 px-4 border'>{Math.ceil(selectedsubject.attendance.reduce((result,ele)=>(result+=ele.count),0)/subject?.lecture_dates?.reduce((result,ele)=>(result+=ele.count),0)*100)} %</td>
              </tr>

            );
          })}
        </tbody>
      </table>
    </div>
  </div>

  )
}
