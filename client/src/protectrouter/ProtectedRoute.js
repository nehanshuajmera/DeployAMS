import React, { useContext, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const {IsLogin}=useContext(AuthContext);
  // const logdata=useSelector((state)=>state.login);

  useEffect(() => {
    console.log('in the protector',IsLogin);
    if(IsLogin !== null && !IsLogin){
      navigate('/');      
    }
  }, [IsLogin])

  return children; //Render the protected content if logged in
}
