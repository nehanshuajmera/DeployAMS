import { Route, Routes } from "react-router-dom"
import Login from './pages/Login/Login'
import ErrMsg from "./components/ErrMsg"
import Dashboard from "./pages/SuperAdmin/Dashboard/Dashboard"
import AllStudent from "./pages/SuperAdmin/Students/AllStudent"
import AllTeacher from "./pages/SuperAdmin/Teachers/AllTeacher"
import AllSubject from "./pages/SuperAdmin/Subjects/AllSubject"
import CreateStudent from './pages/SuperAdmin/Students/CreateStudent'
import UpdateStudent from './pages/SuperAdmin/Students/UpdateStudent'
import UpdateTeacher from "./pages/SuperAdmin/Teachers/UpdateTeacher"
import CreateTeacher from "./pages/SuperAdmin/Teachers/CreateTeacher"
import UpdateSubject from "./pages/SuperAdmin/Subjects/UpdateSubject"
import CreateSubject from "./pages/SuperAdmin/Subjects/CreateSubject"
import Alert from "./pages/SuperAdmin/Alert&Notice/Alert"
import MarkAttendence from "./pages/Admin/AttendenceSheet/MarkAttendence"
import TeacherDashboard from "./pages/Admin/Dashboard/TeacherDashboard"
import ProtectedRoute from "./protectrouter/ProtectedRoute"
import Calendar from "./pages/SuperAdmin/Calendar/Calendar"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import AttendancePermission from "./pages/SuperAdmin/AttendancePermission/AttendancePermission"
import PreviousAttendence from "./pages/Admin/PreviousAttendance/PreviousAttendance"
import SubstituteTeacher from "./pages/Admin/Substitute Teacher/SubstituteTeacher"
import ArangementClass from "./pages/Admin/ArangementClass/ArangementClass"
import LoginRoute from "./protectrouter/LoginRoute"
import PermissionGranted from "./pages/Admin/GrantedPermission/PermissionGranted"
// import Header from "./Universal/header"

function App() {

  return (
    <div className="w-full overflow-hidden bg-dimWhite ">
      {/* <Header /> */}
      <Routes>
        <Route path={'/'} element={<LoginRoute>
         <Login />
         </LoginRoute>
         } />
        <Route path={'/teacherdashboard'} element={<ProtectedRoute>
          <TeacherDashboard />
        </ProtectedRoute>} />
        <Route path={'/previousattendance'} element={<ProtectedRoute>
          <PreviousAttendence />
        </ProtectedRoute>} />
        <Route path={'/substituteteacher'} element={<ProtectedRoute>
          <SubstituteTeacher />
        </ProtectedRoute>} />
        <Route path={'/arangementclass'} element={<ProtectedRoute>
          <ArangementClass />
        </ProtectedRoute>} />
        <Route path={'/grantedpermission'} element={<ProtectedRoute>
          <PermissionGranted />
        </ProtectedRoute>} />
        <Route path={'/dashboard'} element={<ProtectedRoute>
          < Dashboard />
        </ProtectedRoute>} />
        <Route path={'/allstudent'} element={<ProtectedRoute>
          < AllStudent />
        </ProtectedRoute>} />
        <Route path={'/allteacher'} element={<ProtectedRoute>
          <AllTeacher />
        </ProtectedRoute>} />
        <Route path={'/allsubject'} element={<ProtectedRoute>
          < AllSubject />
        </ProtectedRoute>} />
        <Route path={'/createstudent'} element={<ProtectedRoute>
          < CreateStudent />
        </ProtectedRoute>} />
        <Route path={'/updatestudent/:id'} element={<ProtectedRoute>
          < UpdateStudent />
        </ProtectedRoute>} />
        <Route path={'/createsubject'} element={<ProtectedRoute>
          < CreateSubject />
        </ProtectedRoute>} />
        <Route path={'/updatesubject/:id'} element={<ProtectedRoute>
          < UpdateSubject />
        </ProtectedRoute>} />
        <Route path="/createteacher" element={<ProtectedRoute>
          < CreateTeacher />
        </ProtectedRoute>} />
        <Route path="/updateteacher/:id" element={<ProtectedRoute>
          < UpdateTeacher />
        </ProtectedRoute>} />
        <Route path="/markattendance" element={<ProtectedRoute>
          < MarkAttendence />
        </ProtectedRoute>} />
        <Route path="/academiccalendar" element={<ProtectedRoute>
          < Calendar />
        </ProtectedRoute>} />
        <Route path="/attendancepermission" element={<ProtectedRoute>
          < AttendancePermission />
        </ProtectedRoute>} />
        <Route path="/alert" element={<Alert />} />
        <Route path="*" element={<ErrMsg />} />
      </Routes>

      {/* <MarkAttendence/> */}
    </div>
  )
}

export default App
