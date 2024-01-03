import React from 'react'
import './Dashboard.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logoutAsync } from '../../../redux-toolkit/slices/loginslice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handellogout = () => {
    dispatch(logoutAsync());
    navigate("/")
  }
  return (
    <div className='AdminDashboard'>
      <hr className="styleHr" />
      <div className='dashboardMainContainer'>
        <div className="adminMain admin-479px">
          <div onClick={() => { navigate('/allstudent') }}>See All Students</div>
          <div onClick={() => navigate("/createstudent")}>Create Student</div>
          <div onClick={() => navigate("/allteacher")}>See All Teachers</div>
          <div onClick={() => navigate("/createteacher")}>Create Teacher</div>
          <div onClick={() => navigate("/allsubject")}>See All Subjects</div>
          <div onClick={() => navigate("/createsubject")}>Create Subject</div>
        </div>
        <div className="adminExtra admin-479px">
          <div onClick={() => navigate("/attendancepermission")}>Attendance Permission</div>
          <div onClick={() => navigate("/academiccalendar")}>Academic Calendar</div>
          <div onClick={() => navigate("/mapstudentandsubject")}>Map Student & Subject</div>
          <div onClick={() => navigate("/alert")}>Alert & Notice</div>
          <div onClick={() => navigate("/mapteacherandsubject")}>Map Teacher & Subject</div>
          <div onClick={() => navigate("/dataupload")}>XLSX Data Upload</div>
        </div>
      </div>
    </div>
  )
}
