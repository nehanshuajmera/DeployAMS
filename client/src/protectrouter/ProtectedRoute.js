import React, { useContext, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const {IsLogin}=useContext(AuthContext);

  useEffect(() => {
    if(IsLogin !== null&&!IsLogin){
      navigate('/login');      
    }
  }, [IsLogin])

  return children; //Render the protected content if logged in
}
