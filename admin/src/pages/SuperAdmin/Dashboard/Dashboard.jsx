import { useContext } from 'react'
import './Dashboard.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logoutAsync } from '../../../redux-toolkit/slices/loginslice';
import AuthContext from '../../../context/AuthContext';
export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userdata } = useContext(AuthContext);
  // console.log(userdata)
  const handellogout = () => {
    dispatch(logoutAsync());
    navigate("/")
  }
  return (
    <div className='AdminDashboard'>
      <div className='container-fluid' id="pa">
        <div className="rw">
          <div className="cm">
            <div className="card" id="z1">
              <span className="heading1">VIEW & ADD DATA</span>
              {userdata.admin_role === "Admin" ? <div onClick={() => navigate("/createstudent")}>Add Student</div> : null}
              {userdata.admin_role === "Admin" ? <div onClick={() => navigate("/createteacher")}>Add Teacher</div> : null}
              <div  onClick={() => navigate("/createsubject")}>Add Subject</div>
              <div onClick={() => { navigate('/allstudent') }}>View All Students</div>
              <div onClick={() => navigate("/allteacher")}>View All Teachers</div>
              <div className="j1" onClick={() => navigate("/allsubject")}>View All Subjects</div>
              
            </div>
          </div>
          <div className="cm">
            <div className="card" id="z1">
            <span className="heading1">ADMIN OPTIONS</span>
              {userdata.admin_role === "Admin" ? <div onClick={() => navigate("/attendancepermission")}>Attendance Permission</div> : null}
              {userdata.admin_role === "Admin" ? <div onClick={() => navigate("/academiccalendar")}>Academic Calendar</div> : null}
              <div onClick={() => navigate("/mapstudentandsubject")}>Map Student & Subject</div>
              <div onClick={() => navigate("/alert")}>Alert & Notice</div>
              <div onClick={() => navigate("/mapteacherandsubject")}>Map Teacher & Subject</div>
              {userdata.admin_role === "Admin" ? <div onClick={() => navigate("/dataupload")}>XLSX Data Upload</div> : null}
              <div className="j1" onClick={() => navigate("/logviewer")}>See Logs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
