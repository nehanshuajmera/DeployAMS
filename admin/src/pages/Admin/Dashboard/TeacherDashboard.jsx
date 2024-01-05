import React, { useContext, useEffect } from 'react'
import './Dashboard.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { logoutAsync } from '../../../redux-toolkit/slices/loginslice';
import { userdetailasync } from '../../../redux-toolkit/slices/userdetailslice';
import { TYPE, useMsgErr } from '../../../context/MsgAndErrContext';
import  AuthContext  from '../../../context/AuthContext';

export default function TeacherDashboard() {
  const { setMsgType, setMsg } = useMsgErr()
  const { logout ,userdata } = useContext(AuthContext);
  // console.log(userdata)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    ; (async () => {
      try {

        await dispatch(userdetailasync());
        if (userDetail.isErr) {
          setMsgType(TYPE.Err)
          setMsg(userDetail.errMsg)
        }
        // const studentState = useSelector(state=>state.crudstudent)

      } catch (error) {
        console.log(error);
      }
    })();
  }, [])
  const userDetail = useSelector(state => state.userdetail)
  // console.log(userDetail)

  let subjects = userDetail?.details?.subjects
  useEffect(() => {
    subjects = userDetail.details?.subjects
    console.log(subjects)
  }, [userDetail.details])


  const handellogout = () => {
    dispatch(logoutAsync());

    navigate("/")
  }

  // calculate total number of lecture 
  const gotoSubjectAttendance = (sub_id) => {
    // console.log(subjects)
    let totalLectures = subjects.find(subj => subj.subject_id._id === sub_id).subject_id.lecture_dates.reduce((result, ele) => (result += ele.count), 0)
    // console.log(totalLectures)
    navigate(`/markattendance/${sub_id}`, { state: { totalLectures } })
  }

  return (
    <div className='teacherDashboard'>
      <hr className="styleHr" />
      <div className="teacherContentContainer">
        <div className="teacherHeader m-2 ">

          <h1>

          Teacher Id : {userdata?.teacher_id}
          </h1>
          <h1>
          Name : {userdata?.name}
          </h1>
          </div>
        <div className="teacherMain">
          {
            subjects &&
            subjects.map(subject => {
              return (
                <div key={subject.subject_id._id} onClick={() => gotoSubjectAttendance(subject.subject_id._id)}>{subject.subject_id.course_code} - {subject.subject_id.branch} - {subject.subject_id.subject_name} - {subject.subject_id.section} - {subject.subject_id.batch} </div>
              )
            })
          }
        </div>
        <div className="teacherExtra">
          {/* <div onClick={() => navigate("/arangementclass")}>Arrangement Class</div> */}
          {userdata.admin_role==="AcademicHead" ?<div onClick={() => navigate("/academichead")}>ALL STUDENTS</div>:null}
          <div onClick={() => navigate("/pastattendancerequest")}>Past Attendance Request</div>
        </div>
      </div>
    </div>
  )
}
