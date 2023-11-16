import { Route, Routes } from "react-router-dom"
import Login from './pages/Login/Login'
import ErrMsg from "./components/ErrMsg"
import CreateStudent from "./pages/CreateStudent"
import UpdateStudent from "./pages/UpdateStudent"

function App() {

  return (
    <div className="w-full overflow-hidden ">
      <ErrMsg/>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
          <Route path="/createstudent" element={<CreateStudent/>} />
          <Route path="/updatestudent/:id" element={<UpdateStudent/>} />
          <Route path="*" element={<ErrMsg/>}/>
      </Routes>

   </div>
  )
}

export default App
