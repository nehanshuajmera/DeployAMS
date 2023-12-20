import React from 'react'
import './Dashboard.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { logoutAsync } from '../../../redux-toolkit/slices/loginslice';
export default function TeacherDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handellogout = () => {
    dispatch(logoutAsync());

    navigate("/")
  }
  return (
    <div className='teacherDashboard'>
      <div className="universalDetailsAdmin">
        <div className="cllgLogo">
          <img src="https://medicaps.ac.in/resources/img/logo-navbar.png" alt="CollegeLogo" />
        </div>
        <div className="logoutButton">
          <button onClick={() => { navigate('/dashboard') }}>Admin Dashboard</button>
        </div>
        <div className="logoutButton">
          <button onClick={handellogout}>Logout</button>
        </div>
      </div>
      <hr className="styleHr" />

      <div className="teacherContentContainer">
        <div className="teacherMain">
          <div onClick={() => navigate("/markattendance")}>CSE-3B</div>
          <div onClick={() => navigate("")}>7-CSBS</div>
          <div onClick={() => navigate("")}>CSE-5A</div>
          <div onClick={() => navigate("")}>CSE-3D</div>
          <div onClick={() => navigate("")}>CSE-3E</div>
          <div onClick={() => navigate("")}>CSE-5F</div>
        </div>
        {/* <div className="teacherExtra">
          <div onClick={() => navigate("")}>Arrangement Class</div>
          <div onClick={() => navigate("")}>Notify Substitute Teacher</div>
        </div> */}
      </div>
    </div>
  )
}
