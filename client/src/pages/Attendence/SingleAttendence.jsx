import React, { useState } from 'react'
import './SingleAttendence.css';

export default function SingleAttendence(props) {

  // const [Subjects, setSubjects] = useState(Data);

  return (
    <div className="singleStudentMain">
      <div className="universalDetails">
        <div className="cllgLogo">
          <img src={props.Image} alt="CollegeLogo" />
        </div>
        <div className="studentDepartment">
          <h4>Department of {props.Department}</h4>
        </div>
        <div className="logoutButton">
          <button>Logout</button>
        </div>
      </div>
      <hr className="styleHr" />
      <div className="studentDetails">
        <div className="studentProgramme"><h4>Program: {props.Program}</h4></div>
        <div className="studentName"><h4>Name: {props.Name}</h4></div>
        <div className="studentId"><h4>Enrollment No.: {props.Id}</h4></div>
        <div className="Year"><h4>Year: {props.Year}</h4></div>
        <div className="cls-sec"><h4>Class & Section: {props.Class}-{props.Section}</h4></div>
        <div className="studentBatch"><h4>Batch: {props.Batch}</h4></div>
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
          <button><h4>Check Day-Wise Attendence</h4></button>
        </div>
      </div>
    </div>
  )
}