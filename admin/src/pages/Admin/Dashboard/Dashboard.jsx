import React from 'react'
import './Dashboard.css'

export default function TeacherDashboard() {
  return (
    <div className='teacherDashboard'>
      <div className="universalDetailsAdmin">
        <div className="cllgLogo">
          <img src="https://medicaps.ac.in/resources/img/logo-navbar.png" alt="CollegeLogo" />
        </div>
        <div className="logoutButton">
          <button onClick={() => navigate('/')}>Logout</button>
        </div>
      </div>
      <hr className="styleHr" />

      <div className="teacherContentContainer">
        <div className="teacherMain">
          <div onClick={() => navigate("")}>CSE-3B</div>
          <div onClick={() => navigate("")}>7-CSBS</div>
          <div onClick={() => navigate("")}>CSE-5A</div>
          <div onClick={() => navigate("")}>CSE-3D</div>
          <div onClick={() => navigate("")}>CSE-3E</div>
          <div onClick={() => navigate("")}>CSE-5F</div>
        </div>
      </div>
    </div>
  )
}
