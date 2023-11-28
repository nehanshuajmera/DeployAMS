import { Route, Routes } from "react-router-dom"
import StudentAttendance from './pages/Attendence/StudentAttendence'
// import PrivateRoutes from "./components/PrivateRoutes"
import Login from "./pages/Login/Login"
import AttendenceSheet from "./pages/DaywiseAtt/AttendenceSheet"
import ChangePassword from "./pages/ChangePassword/ChangePassword"

function App() {

  return (
    <div className="w-screen overflow-hidden h-screen flex items-center justify-center">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/changepassword"} element={<ChangePassword />} />
        <Route path={"/studentattendence"} element={<StudentAttendance />} />
        <Route path={"/attendencesheet"} element={<AttendenceSheet />} />
      </Routes>
    
    </div>
  )
}

export default App
