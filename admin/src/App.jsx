import { Route, Routes } from "react-router-dom"
import Login from './pages/Login/Login'
import ErrMsg from "./components/ErrMsg"
import Dashboard from "./pages/SuperAdmin/Dashboard/Dashboard"
import AllStudent from "./pages/SuperAdmin/Students/AllStudent"
import AllTeacher from "./pages/SuperAdmin/Teachers/AllTeacher"
import AllSubject from "./pages/SuperAdmin/Subjects/AllSubject"
import CreateStudent from './pages/CreateStudent'
import UpdateStudent from './pages/UpdateStudent'
// import UpdateTeacher from "./pages/SuperAdmin/Teachers/UpdateTeacher"
// import CreateTeacher from "./pages/SuperAdmin/Teachers/CreateTeacher"
import UpdateSubject from "./pages/SuperAdmin/Subjects/UpdateSubject"
import CreateSubject from "./pages/SuperAdmin/Subjects/CreateSubject"
function App() {

  return (
    <div className="w-full overflow-hidden bg-dimWhite ">
      <ErrMsg/>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'/dashboard'} element={<Dashboard/>}/>
        <Route path={'/allstudent'} element={<AllStudent/>}/>
        <Route path={'/allteacher'} element={<AllTeacher/>}/>
        <Route path={'/allsubject'} element={<AllSubject/>}/>
          <Route path="/createstudent" element={<CreateStudent/>}/>
          <Route path="/updatestudent" element={<UpdateStudent/>} />
          <Route path="/createsubject" element={<CreateSubject/>}/>
          <Route path="/updatesubject" element={<UpdateSubject/>} />
          {/* <Route path="/createteacher" element={<CreateTeacher/>}/>
          <Route path="/updateteacher/:id" element={<UpdateTeacher/>} /> */}
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
