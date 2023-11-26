import { Route, Routes } from "react-router-dom"
import Login from './pages/Login/Login'
import ErrMsg from "./components/ErrMsg"
import Dashboard from "./pages/SuperAdmin/Dashboard/Dashboard"
import AllStudent from "./pages/SuperAdmin/Students/AllStudent"
import AllTeacher from "./pages/SuperAdmin/Teachers/AllTeacher"
import AllSubject from "./pages/SuperAdmin/Subjects/AllSubject"
import CreateStudent from './pages/CreateStudent'
import UpdateStudent from './pages/UpdateStudent'
function App() {

  return (
    <div className="w-full overflow-hidden bg-dimWhite ">
      <ErrMsg/>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'/admin/dashboard'} element={<Dashboard/>}/>
        <Route path={'/admin/allstudent'} element={<AllStudent/>}/>
        <Route path={'/admin/allteacher'} element={<AllTeacher/>}/>
        <Route path={'/admin/allsubject'} element={<AllSubject/>}/>
          <Route path="/admin/createstudent" element={<CreateStudent/>}/>
          <Route path="/admin/updatestudent/:id" element={<UpdateStudent/>} />
          <Route path="*" element={<ErrMsg/>}/>
      </Routes>

      {/* <Login/> */}

      {/* <Dashboard/> */}
      {/* <AllStudent/> */}
      {/* <AllTeacher/> */}
      {/* <AllSubject/> */}
    </div>
  )
}

export default App
