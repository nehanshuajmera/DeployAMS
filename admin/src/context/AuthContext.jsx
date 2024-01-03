import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthContextProvider(props) {
    
  const [IsLogin, setIsLogin] = useState(null);
  const [toastmessage, settoastmessage] = useState("")
  
  const [userdata, setuserdata] = useState({"_id": "",
  "teacher_id": "",
  "name": "",
  "email": "",
  "phone_no": "",
  "subjects": [],
  "password": "",
  "updated_at": "",
  "created_by": "",
  "created_at": "",
  "admin_role": ""});
  const [userapi,setuserapi]=useState([]);
  
  const navigate = useNavigate();
    
   useEffect(() => {
    axios.get("/api/teacher/details")
      .then((res) => { 
        setIsLogin(true)
        // console.log(res.data.message)
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