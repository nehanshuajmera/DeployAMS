import Login from "./pages/Login/Login"
import StudentAttendence from "./pages/StudentDetail/StudentAttendence"


function App() {

  return (
    <div className="w-screen overflow-hidden h-screen flex items-center justify-center flex-col">
      {/* <Login/> */}
      <StudentAttendence/>
    </div>
  )
}

export default App
