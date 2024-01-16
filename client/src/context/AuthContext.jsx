import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  
  // const logdata=useSelector((state)=>state.login);
  const navigate = useNavigate();
    
   useEffect(() => {
    // console.log(logdata);
    axios.get("https://medicaps-ams.onrender.com/api/student/details")
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
    axios.get("https://medicaps-ams.onrender.com/api/authentic/logout")
      .then((res) => {
        setIsLogin(false)
        navigate("/");
        
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