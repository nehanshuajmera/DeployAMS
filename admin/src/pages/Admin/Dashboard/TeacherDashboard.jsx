import React from 'react'
import './Dashboard.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { logoutAsync } from '../../../redux-toolkit/slices/loginslice';

export default function TeacherDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handellogout = () => {

    
    try {
      console.log("dispatch logout");
      dispatch(logoutAsync());
        navigate("/");
      console.log("after dis")
      
    } catch (error) {
      console.log(error);
    }
   
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
           
        </div>
        <div className="teacherExtra">
          <div onClick={() => navigate("/grantedpermission")}>Permission Granted</div>
          <div onClick={() => navigate("/arangementclass")}>Arrangement Class</div>
          <div onClick={() => navigate("/substituteteacher")}>Notify Substitute Teacher</div>
        </div>
      </div>
    </div>
  )
}
