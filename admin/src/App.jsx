import { Route, Routes } from "react-router-dom"
import Login from './pages/Login/Login'
import ErrMsg from "./components/ErrMsg"
import Dashboard from "./pages/SuperAdmin/Dashboard/Dashboard"
import AllStudent from "./pages/SuperAdmin/Students/AllStudent"

function App() {

  return (
    <div>
      {/* <ErrMsg/> */}
      {/* <Routes>
        <Route path={'/'} element={<Login/>}/>
          <Route path="/createstudent" element={<CreateStudent/>} />
          <Route path="/updatestudent/:id" element={<UpdateStudent/>} />
          <Route path="*" element={<ErrMsg/>}/>
      </Routes> */}

      {/* <Dashboard/> */}
      <AllStudent/>
    </div>
  )
}

export default App
