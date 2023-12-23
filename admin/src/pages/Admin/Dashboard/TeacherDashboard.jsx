import React, { useEffect } from 'react'
import './Dashboard.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { logoutAsync } from '../../../redux-toolkit/slices/loginslice';
import { userdetailasync } from '../../../redux-toolkit/slices/userdetailslice';
export default function TeacherDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    ;(async()=>{
      try{

        await dispatch(userdetailasync());
        // const studentState = useSelector(state=>state.crudstudent)
        
      }catch(error){
        console.log(error);
      }
    })();    
  },[])
  const userDetail = useSelector(state=>state.userdetail)
  console.log(userDetail)
  
  const subjects = userDetail.details.subjects

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
          {
            subjects && 
            subjects.map(subject=>{
              return(
                <div key={subject._id} onClick={() => navigate(`/markattendance/${subject._id}`)}>{subject.Section}-{subject.year} {subject.subject_name}</div>                
                )
              })
            }
          {/* <div onClick={() => navigate("")}>7-CSBS</div>
          <div onClick={() => navigate("")}>CSE-5A</div>
          <div onClick={() => navigate("")}>CSE-3D</div>
          <div onClick={() => navigate("")}>CSE-3E</div>
          <div onClick={() => navigate("")}>CSE-5F</div> */}
        </div>
        <div className="teacherExtra">
          <div onClick={() => navigate("/arangementclass")}>Arrangement Class</div>
          <div onClick={() => navigate("/substituteteacher")}>Notify Substitute Teacher</div>
        </div>
      </div>
    </div>
  )
}
