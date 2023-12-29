import React, { useEffect, useState } from 'react'
import './SingleAttendence.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../redux-toolkit/slicees/loginslice';
import { studentdetailasync } from '../../redux-toolkit/slicees/studentdataslice';


//hey nehanshu i have an task for you 
//you have  to join the data to frontend
//i will guide you by this message.
//to get the data of student on other page use use select hook like on line no.26 exactly same
//but wait first you have to call api by use dispatch hook  in use effect so that data can reload on page automatically in line no. 16 exactly same
export default function SingleAttendence(props) {
const dispatch=useDispatch()
const data=useSelector((state)=>state.login)
// console.log(data)
useEffect(() => {
 const unsub=()=>{
  dispatch(studentdetailasync());

 }

  return () => {
   unsub();
  }
}, [data])

// if(useLocation().pathname === '/studentattandence')
// {
//   dispatch(studentdetailasync());
// }

const detail=useSelector((state)=>state.studentDetail.details);
  console.log(detail);
  
  const navigate = useNavigate();
 const handellogout=async()=>{
  console.log("logging out");
      dispatch(logoutAsync());
      navigate("/login");
      
  }
  
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date()); // Update current date every 24 hours
    }, 24 * 60 * 60 * 1000); // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, []);
  
  return (
    <div className="singleStudentMain">
      <div className="universalDetails">
        <div className="cllgLogo">
          {/* <img src={props.Image} alt="CollegeLogo" /> */}
          <img src="https://medicaps.ac.in/resources/img/logo-navbar.png" alt="CollegeLogo" />
        </div>
        <div className="studentDepartment">
          <h4>Department of {props.Department}</h4>
        </div>
        <div className="logoutButton">
          <button onClick={handellogout}>Logout</button>
        </div>
      </div>
      <hr className="styleHr" />
      <div className="studentDetails">
        <div className="studentProgramme"><h4>Programme: {props.Programme}</h4></div>
        <div className="studentName"><h4>Name: {detail?.name}</h4></div>
        <div className="studentId"><h4>Enrollment No.: {detail?.enrollment_no}</h4></div>
        <div className="Year"><h4>Year: {props.Year}</h4></div>
        <div className="cls-sec"><h4>Class & Section: {detail?.branch}</h4></div>
        <div className="studentBatch"><h4>Batch: {detail?.batch}</h4></div>
      </div>
      <div className="subjectAttendence">
        <table className='subjectTable'>
          <thead className="subjectTableHeading">
            <tr>
              <th className='headingForStudents'>Course Code</th>
              <th className='headingForStudents'>Subject Name</th>
              <th className='headingForStudents'>Total Attendence </th>
              <th className='headingForStudents'>Attendence </th>
              <th className='headingForStudents'>Percentage </th>
              <th className='headingForStudents'>Daily Attendence {currentDate.toLocaleDateString()} </th>
            </tr>
          </thead>
          <tbody className='subjectTableBody'>
          {
                detail?.subjects.map((subject,index) => {
                  const attendedLectures = subject.attendance.length;
                  const totalLectures = subject.subject_id.lecture_dates.length;
                  const percentage = totalLectures > 0 ? ((attendedLectures / totalLectures) * 100).toFixed(2) : 0;
                 
                  const ans = subject.attendance.includes(new Date().toLocaleDateString()) ? 'present' : 'Absent';

                  return(
                  <><tr key={index}>
                   <td className='dataForStudents'>{subject.subject_id.course_code}</td>
                   
                   <td className='dataForStudents'>{subject.subject_id.subject_name}</td>
                   <td className='dataForStudents'>{attendedLectures}</td>
                   <td className='dataForStudents'>{totalLectures}</td>
                   <td className='dataForStudents'>{`${percentage}%`}</td>
                   <td className='dataForStudents'>{ans}</td>

                 
                    </tr>
                    </>
                    
                  )

                  
                })
              } 
          </tbody>
          {/* <tbody className='subjectTableBody'>
            {Subjects.map((subject) => (
              <tr>
                <td className='dataForStudents'>{subject.CourseCode}</td>
                <td className='dataForStudents'>{subject.Name}</td>
                <td className='dataForStudents'>{subject.Percent}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
      <div className="detailedAttendence">
        <div className="checkAttendence">
          <button onClick={() => navigate('/changepassword')}><h4>Change Password</h4></button>
          <button onClick={() => navigate('/studentattendance/daywise')}><h4>Check Day-Wise Attendence</h4></button>
        </div>
      </div>
    </div>
  )
}
