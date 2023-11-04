import { Route, Routes } from "react-router-dom"
import StudentAttendance from './pages/StudentDetail/StudentAttendence'
import PrivateRoutes from "./components/PrivateRoutes"
// import Login from "./pages/Login"

function App() {

  return (
    <div className="w-screen overflow-hidden h-screen flex items-center justify-center">
      {/* <Login/> */}
      <Routes>
        <Route path="/" element={<PrivateRoutes/>}>
          <Route path="/student" element={<StudentAttendance/>}/>
        </Route>
      </Routes>
      
    </div>

  )
}

export default App
