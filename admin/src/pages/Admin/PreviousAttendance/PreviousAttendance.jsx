import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PreviousAttendance = () => {
  const { id: sub_id } = useParams();
  const [dataofstudent, setDataOfStudent] = useState(null);

  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  };

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/teacher/studentsattendance/${sub_id}`);
        console.log(response.data);
        setDataOfStudent(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sub_id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Previous Attendance</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Student Name</th>
              <th className="py-2 px-4 border">Enrollment No.</th>
              {dataofstudent?.subject?.lecture_dates.length > 0 &&
                dataofstudent.subject.lecture_dates.map((dates) => (
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
            {dataofstudent?.message.map((student) => {
              let selectedsubject = student.subjects.find((subject) => subject.subject_id === sub_id);
              const formattedAttendance = selectedsubject.attendance.map((dates)=> convertDate(dates.date));
              // console.log(selectedsubject);
              return (
                <tr key={student._id}>
                  <td className="py-2 px-4 border">{student.name}</td>
                  <td className="py-2 px-4 border">{student.enrollment_no}</td>
                  {dataofstudent?.subject?.lecture_dates.length > 0 &&
                dataofstudent.subject.lecture_dates.map((dates) => (
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
                <td className='py-2 px-4 border'>{dataofstudent?.subject?.lecture_dates?.reduce((result,ele)=>(result+=ele.count),0)}</td>
                <td className='py-2 px-4 border'>{Math.ceil(selectedsubject.attendance.reduce((result,ele)=>(result+=ele.count),0)/dataofstudent?.subject?.lecture_dates?.reduce((result,ele)=>(result+=ele.count),0)*100)} %</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviousAttendance;
