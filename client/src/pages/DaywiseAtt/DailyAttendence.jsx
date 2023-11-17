import React from 'react'
import './DailyAttendence.css'

export default function DailyAttendence(props) {
  return (
    <div className="attendenceContainer">

      <div className="universalDetails">
        <div className="cllgLogo">
          {/* <img src={props.Image} alt="CollegeLogo" /> */}
          <img src="https://medicaps.ac.in/resources/img/logo-navbar.png" alt="CollegeLogo" />
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
        <div className="studentProgramme"><h4>Programme: {props.Programme}</h4></div>
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
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>2 Nov 23</th>
              <th className='headingForStudents'>3 Nov 23</th>
              <th className='headingForStudents'> Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>1 Nov 23</th>
              <th className='headingForStudents'>34 Nov 23</th>
            </tr>
          </thead>
          <tbody className='subjectTableBody'>
            <tr>
              <td className='dataForStudents'>CB3CO12</td>
              <td className='dataForStudents' style={{color:"green", fontWeight:"bold", fontSize:"150%"}}>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
              <td className='dataForStudents'>P</td>
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
    </div>
  )
}
