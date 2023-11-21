import React from 'react'
import './Dashboard.css'
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
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
          <div onClick={()=>navigate("/allstudent")}>See All Students</div>
          <div onClick={()=>navigate("/")}>Create Student</div>
          <div onClick={()=>navigate("/")}>Delete student</div>
          <div onClick={()=>navigate("/allteacher")}>See All Teachers</div>
          <div onClick={()=>navigate("/")}>Create Teacher</div>
          <div onClick={()=>navigate("/")}>Delete Teacher</div>
          <div onClick={()=>navigate("/allsubject")}>See All Subjects</div>
          <div onClick={()=>navigate("/")}>Create Subject</div>
          <div onClick={()=>navigate("/")}>Delete Subject</div>
        </div>
        <div className="adminExtra">
          <div onClick={()=>navigate("/")}>Attendence Permission</div>
          <div onClick={()=>navigate("/")}>Alert & Notice</div>
        </div>
      </div>
    </div>
  )
}
