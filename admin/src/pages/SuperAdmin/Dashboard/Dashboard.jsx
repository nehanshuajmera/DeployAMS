import React from 'react'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className='dashboardMainContainer'>

      <div className="universalDetailsAdmin">
        <div className="cllgLogo">
          <img src="https://medicaps.ac.in/resources/img/logo-navbar.png" alt="CollegeLogo" />
        </div>
        <div className="logoutButton">
          <button>Logout</button>
        </div>
      </div>
      <hr className="styleHr" />

      <div className="adminContentContainer">
        <div className="adminMain">
          <div>See All Students</div>
          <div>Create Student</div>
          <div>Delete student</div>
          <div>See All Teachers</div>
          <div>Create Teacher</div>
          <div>Delete Teacher</div>
          <div>See All Subjects</div>
          <div>Create Subject</div>
          <div>Delete Subject</div>
        </div>
        <div className="adminExtra">
          <div>Attendence Permission</div>
          <div>Alert & Notice</div>
        </div>
      </div>
    </div>
  )
}
