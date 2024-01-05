import React, { useContext } from 'react'
import './Dashboard.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logoutAsync } from '../../../redux-toolkit/slices/loginslice';
import AuthContext from '../../../context/AuthContext';
export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userdata}=useContext(AuthContext);
// console.log(userdata)
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
         {userdata.admin_role==="Admin"? <div onClick={() => navigate("/createstudent")}>Create Student</div>:null}
          <div onClick={() => navigate("/allteacher")}>See All Teachers</div>
          {userdata.admin_role==="Admin"?<div onClick={() => navigate("/createteacher")}>Create Teacher</div>:null}
          <div onClick={() => navigate("/allsubject")}>See All Subjects</div>
          <div onClick={() => navigate("/createsubject")}>Create Subject</div>
        </div>
        <div className="adminExtra admin-479px">
        {userdata.admin_role==="Admin"?<div onClick={() => navigate("/attendancepermission")}>Attendance Permission</div>:null}
        {userdata.admin_role==="Admin"?<div onClick={() => navigate("/academiccalendar")}>Academic Calendar</div>:null}
          <div onClick={() => navigate("/mapstudentandsubject")}>Map Student & Subject</div>
          <div onClick={() => navigate("/alert")}>Alert & Notice</div>
          <div onClick={() => navigate("/mapteacherandsubject")}>Map Teacher & Subject</div>
          {userdata.admin_role==="Admin"?<div onClick={() => navigate("/dataupload")}>XLSX Data Upload</div>:null}
        </div>
      </div>
    </div>
  )
}
