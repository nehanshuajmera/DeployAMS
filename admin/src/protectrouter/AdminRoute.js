import React, { useContext, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const navigate = useNavigate();
  const {IsLogin, userdata}=useContext(AuthContext);
// console.log(userdata)
  useEffect(() => {
    if(IsLogin === null){

    }
    else if(!IsLogin){
      navigate('/');
    }
    else if (userdata.admin_role!=='' && (userdata.admin_role!=='Admin'&&userdata.admin_role!=="HOD")){
      navigate('/teacherdashboard');      
    }

  }, [IsLogin])

  return children; // Render the protected content if logged in
}
