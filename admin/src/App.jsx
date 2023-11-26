import { Route, Routes } from "react-router-dom"
import Login from './pages/Login/Login'
import ErrMsg from "./components/ErrMsg"
import Dashboard from "./pages/SuperAdmin/Dashboard/Dashboard"
import AllStudent from "./pages/SuperAdmin/Students/AllStudent"
import AllTeacher from "./pages/SuperAdmin/Teachers/AllTeacher"
import AllSubject from "./pages/SuperAdmin/Subjects/AllSubject"
import CreateStudent from './pages/CreateStudent'
import TeacherDashboard from "./pages/Admin/Dashboard/Dashboard"
function App() {

  return (
    <div>
      {/* <ErrMsg/> */}
      {/* <Route path="/updatestudent/:id" element={<UpdateStudent/>} /> */}
      {/* <Route path="*" element={<ErrMsg/>}/> */}
      {/* <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/allstudent'} element={<AllStudent />} />
        <Route path={'/allteacher'} element={<AllTeacher />} />
        <Route path={'/allsubject'} element={<AllSubject />} />
        <Route path="/createstudent" element={<CreateStudent />} />
      </Routes> */}

      <TeacherDashboard />
    </div>
  )
}

export default App
