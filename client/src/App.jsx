import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, Await } from "react-router-dom"
import StudentAttendance from './pages/Attendence/StudentAttendence'
// import PrivateRoutes from "./components/PrivateRoutes"
import Login from "./pages/Login/Login"
import AttendenceSheet from "./pages/DaywiseAtt/AttendenceSheet"
import ChangePassword from "./pages/ChangePassword/ChangePassword"
import ProtectedRoute from "./protectrouter/ProtectedRoute"
import StudentAttendence from "./pages/Attendence/StudentAttendence"
import { useContext, useEffect } from "react"
import AuthContext from "./context/AuthContext"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  const { IsLogin } = useContext(AuthContext);
  return (
    <div className="overflow-hidden h-full flex items-center justify-center">
      <Routes>
        <Route exact path="/studentattendance" element={<ProtectedRoute>
          <StudentAttendence />
        </ProtectedRoute>} />
        <Route exact path="/studentattendance/daywise" element={<ProtectedRoute>
          <AttendenceSheet />
        </ProtectedRoute>} />
        <Route exact path="/changepassword" element={<ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>} />
        <Route exact path="/" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App