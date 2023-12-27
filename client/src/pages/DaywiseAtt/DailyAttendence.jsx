import React ,{useEffect}from 'react'
import "./DailyAttendence.css";

import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { logoutAsync } from '../../redux-toolkit/slicees/loginslice';
import { studentdetailasync } from '../../redux-toolkit/slicees/studentdataslice';

export default function DailyAttendence(props) {
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


  const detail=useSelector((state)=>state.studentDetail.details);
  console.log(detail);
  
  const navigate = useNavigate();
 const handellogout=async()=>{
  console.log("logging out");
      dispatch(logoutAsync());
      navigate("/login");
      
  }

  const convertDate = (inputDate)=>{
    const dateObj = new Date(inputDate);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate
   }

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
          <button onClick={handellogout}>Logout</button>
        </div>
      </div>
      <hr className="styleHr" />

      <div className="studentDetails">
        <div className="studentProgramme"><h4>Programme: {props.Programme}</h4></div>
        <div className="studentName"><h4>Name: {detail?.name}</h4></div>
        <div className="studentId"><h4>Enrollment No.: {detail?.enrollment_no}</h4></div>
        <div className="Year"><h4>Year: {props.Year}</h4></div>
        <div className="cls-sec"><h4>Class & Section: {detail?.branch} {detail?.section}</h4></div>
        <div className="studentBatch"><h4>Batch: {detail?.batch}</h4></div>
      </div>

      <div className="subjectAttendence">
        <table className='subjectTable'>
          <thead className="subjectTableHeading">
            <tr>
              <th className='headingForStudents'>Course Code</th>
              
                {
                detail?.subjects.map(subject => {
//map for getting into subject
            return(
                  <>
                  <tr>
                   {/* <td >{subject.subject_id.lecture_dates.length}</td> */}
                   {
                       subject.subject_id.lecture_dates.map(lecture_dates => {
                          //map for lecture dates
                          
                              return(
                            
                              <th className='headingForStudents'>{convertDate(lecture_dates.date)}</th>
                              )
                            })
                          }


                    </tr>
                    </>
                    
                  )

                  
                })
              } 
              {/* <th className='headingForStudents'>2 Nov 23</th>
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
              <th className='headingForStudents'>34 Nov 23</th> */}
            </tr>
          </thead>
          <tbody className='subjectTableBody'>
            <tr>
              <td >{
                detail?.subjects.map(subject => {

                  return(
                  <><tr>
                   <td className='dataForStudents'>{subject.subject_id.course_code}</td>
                    </tr>
                    </>
                    
                  )

                  
                })
              } </td>
              {/* <td className='dataForStudents' style={{color:"green", fontWeight:"bold", fontSize:"150%"}}>P</td> */}
              <td className='dataForStudents'>
                {
              detail?.subjects.map(subject => {
//map for getting into subject
            return(
                  <>
                   {
                       subject.attendance.map(attendancee => {
                          //map for lecture dates
                              return(
                            
                              <th className='headingForStudents'>{attendancee.date}</th>
                              )
                            })
                          }
                          </>
                           )

                  
                })
              } 
              </td>

              {/* <td className='dataForStudents'>P</td>
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
              <td className='dataForStudents'>P</td> */}
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
