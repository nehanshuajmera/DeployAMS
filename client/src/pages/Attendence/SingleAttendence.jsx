import React from 'react'
import './SingleAttendence.css';

export default function SingleAttendence(props) {
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
      <hr className="styleHr"/>
      <div className="studentDetails">
        <div className="studentProgramme"><h4>Program: {props.Program}</h4></div>
        <div className="studentName"><h4>Name: {props.Name}</h4></div>
        <div className="studentId"><h4>Enrollment No.: {props.Id}</h4></div>
        <div className="Year"><h4>Year: {props.Year}</h4></div>
        <div className="cls-sec"><h4>Class & Section: {props.Class}-{props.Section}</h4></div>
        <div className="studentBatch"><h4>Batch: {props.Batch}</h4></div>
      </div>
      <div className="subjectAttendence">

      </div>
    </div>
  )
}
