import React, { useContext, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const navigate = useNavigate();
  const {IsLogin, userdata}=useContext(AuthContext);

  useEffect(() => {
    if(IsLogin !== null){

    }
    else if(!IsLogin||userdata.admin_role!=='admin'){
      navigate('/teacherdashboard');      
    }

  }, [IsLogin])

  return children; // Render the protected content if logged in
}
