import React, { useEffect } from 'react'
import "./DailyAttendence.css";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAsync } from '../../redux-toolkit/slicees/loginslice';
import { studentdetailasync } from '../../redux-toolkit/slicees/studentdataslice';

export default function DailyAttendence(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.login)
  // console.log(data)
  useEffect(() => {
    const unsub = () => {
      dispatch(studentdetailasync());

    }

    return () => {
      unsub();
    }
  }, [data])


  const detail = useSelector((state) => state.studentDetail.details);
  // console.log(detail);

  const navigate = useNavigate();
  const handellogout = async () => {
    // console.log("logging out");
    dispatch(logoutAsync());
    navigate("/login");

  }

  const convertDate = (inputDate) => {
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
          <img
            src="https://medicaps.ac.in/resources/img/logo-navbar.png"
            alt="CollegeLogo"
          />
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
        <div className="studentProgramme">
          <h4>Programme: {props.Programme}</h4>
        </div>
        <div className="studentName">
          <h4>Name: {detail?.name}</h4>
        </div>
        <div className="studentId">
          <h4>Enrollment No.: {detail?.enrollment_no}</h4>
        </div>
        <div className="Year">
          <h4>Year: {props.Year}</h4>
        </div>
        <div className="cls-sec">
          <h4>
            Class & Section: {detail?.branch} {detail?.section}
          </h4>
        </div>
        <div className="studentBatch">
          <h4>Batch: {detail?.batch}</h4>
        </div>
      </div>

      <div className="subjectAttendence">
        {detail?.subjects.map(subject => {

          const formattedAttendance = subject.attendance.map((dates)=> convertDate(dates.date));
          //map for getting into subject
          return (<table className='subjectTable'>
            <thead className="subjectTableHeading">
              <tr>
                <th className='headingForStudents'>Course Code</th>

                {/* <td >{subject.subject_id.lecture_dates.length}</td> */}
                {
                  subject.subject_id.lecture_dates.map(lecture_dates => {
                    //map for lecture dates

                    if (lecture_dates.count === 0) {
                      return (
                        <></>
                      )
                    }
                    else{
                      return (
  
                        <th className='headingForStudents'>{convertDate(lecture_dates.date)} ({lecture_dates.count})</th>
                      )
                    }
                  })
                }


              </tr>
            </thead>
            <tbody className='subjectTableBody'>

              <td className='dataForStudents'>{subject.subject_id.course_code}</td>
            
             
                      {
                        subject.subject_id.lecture_dates.map(attendancee => {
                          //map for lecture dates
                          if (attendancee.count === 0) {
                            return (
                              <></>
                            )
                          }
                          else{
                          return (

                            <td className='dataForStudents' >{formattedAttendance.includes(convertDate(attendancee.date)) ? 'present' : 'Absent'}</td>
                          )
                          }
                        })
                      }
                 



            </tbody>
            <br/>
          </table>)
        })
        }
      </div>
    </div>
  );
}
