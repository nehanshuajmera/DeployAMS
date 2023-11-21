import { useLogin } from '../context/LoginContext'
import { Outlet } from 'react-router-dom'
import Login from '../pages/Login/Login'

const PrivateRoutes = () => {
    const {isAuthenticate} = useLogin()
  return (
    <div>
      {
        isAuthenticate?<Outlet/> :<Login/>
      }
    </div>
  )
}

export default PrivateRoutes
