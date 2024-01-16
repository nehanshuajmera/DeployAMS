import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthContextProvider(props) {
    
  const [IsLogin, setIsLogin] = useState(null);
  const [toastmessage, settoastmessage] = useState("")
  
  const [userdata, setuserdata] = useState({
    "_id": "",
    "name": "",
    "enrollment_no": "",
    "scholar_no": "",
    "email": "",
    "phone_no": "",
    "programme": "",
    "faculty": "",
    "specialisation": "",
    "year": 0,
    "branch": "",
    "section": "",
    "batch": "",
    "password": "",
    "subjects": [],
    "ratings": [],
    "updated_at": "",
    "__v": 0  
  });
  
  
  const navigate = useNavigate();
    
   useEffect(() => {
    axios.get("/api/student/details")
      .then((res) => { 
        setIsLogin(true)
        setuserdata(res.data.message);
       })
      .catch((err) => {
        setIsLogin(false)
        console.log(err)
      });
    }, [])

  
  const logout = () => {
    axios.get("/api/authentic/logout")
      .then((res) => {
        setIsLogin(false)
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  

  return (
    <AuthContext.Provider value={{IsLogin,userdata,logout}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };