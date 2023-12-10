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

const detail=useSelector((state)=>state.studentDetail);
  console.log(detail);
  
  const navigate = useNavigate();
 const handellogout=async()=>{
  console.log("logging out");
      dispatch(logoutAsync());
      navigate("/login");
      
  }
  
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
        <div className="studentName"><h4>Name: {detail.details.name}</h4></div>
        <div className="studentId"><h4>Enrollment No.: {detail.details.enrollment_no}</h4></div>
        <div className="Year"><h4>Year: {props.Year}</h4></div>
        <div className="cls-sec"><h4>Class & Section: {detail.details.branch}</h4></div>
        <div className="studentBatch"><h4>Batch: {detail.details.batch}</h4></div>
      </div>
      <div className="subjectAttendence">
        <table className='subjectTable'>
          <thead className="subjectTableHeading">
            <tr>
              <th className='headingForStudents'>Course Code</th>
              <th className='headingForStudents'>Subject Name</th>
              <th className='headingForStudents'>Attendence Percentage</th>
            </tr>
          </thead>
          <tbody className='subjectTableBody'>
            <tr>
              <td className='dataForStudents'>CB3CO12</td>
              <td className='dataForStudents'>Object Oriented Programming</td>
              <td className='dataForStudents'>65%</td>
            </tr>
            <tr>
              <td className='dataForStudents'>CB3CO12</td>
              <td className='dataForStudents'>OOP's</td>
              <td className='dataForStudents'>65%</td>
            </tr>
            <tr>
              <td className='dataForStudents'>CB3CO12</td>
              <td className='dataForStudents'>OOP's</td>
              <td className='dataForStudents'>65%</td>
            </tr>
            <tr>
              <td className='dataForStudents'>CB3CO12</td>
              <td className='dataForStudents'>OOP's</td>
              <td className='dataForStudents'>65%</td>
            </tr>
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
