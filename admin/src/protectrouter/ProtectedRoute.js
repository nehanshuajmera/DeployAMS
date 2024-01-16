import React, { useContext, useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  

  const {IsLogin}=useContext(AuthContext);

  useEffect(() => {
    console.log("its here in protector");
    if(IsLogin !== null && !IsLogin){
      navigate('/');      
    }
  }, [IsLogin])

  return children; //Render the protected content if logged in
}
