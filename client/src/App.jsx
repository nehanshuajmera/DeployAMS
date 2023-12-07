import { BrowserRouter as Router,Route, Routes, useNavigate, Navigate, Await } from "react-router-dom"
import StudentAttendance from './pages/Attendence/StudentAttendence'
// import PrivateRoutes from "./components/PrivateRoutes"
import Login from "./pages/Login/Login"
import AttendenceSheet from "./pages/DaywiseAtt/AttendenceSheet"
import ChangePassword from "./pages/ChangePassword/ChangePassword"
import ProtectedRoute from "./protectrouter/ProtectedRoute"
import StudentAttendence from "./pages/Attendence/StudentAttendence"
import { useEffect } from "react"


function App() {

  return (
    <div className="w-screen overflow-hidden h-screen flex items-center justify-center">
      <Router>
        <Routes>
        {/* <Route path="/login" element={<LoginRoute>
            <Login/>
            </LoginRoute>}/> */}
          <Route path="/studentattendance/daywise" element={<ProtectedRoute>
            <AttendenceSheet/>
          </ProtectedRoute>}/>
            <Route path="/studentattendance" element={<ProtectedRoute>
            <StudentAttendence/>
            </ProtectedRoute>}/>
            <Route path="/changepassword" element={<ProtectedRoute>
            <ChangePassword/>
            </ProtectedRoute>}/>
            <Route exact path="/" element={<ProtectedRoute>
             
            </ProtectedRoute>} />
            <Route exact path="/login" element={<Login />} />
        <Route exact path="/changepassword" element={<ChangePassword/>} />
        <Route exact path="/studentattandence" element={<StudentAttendence />} />
        <Route exact path="/studentattendance/daywise" element={<AttendenceSheet />} />
        </Routes>
      </Router>
    
    </div>
  )
}

export default App