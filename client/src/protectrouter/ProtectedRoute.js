import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // const navigate = useNavigate();
  // const login = useSelector((state) => state.login);
  // const datastate = JSON.parse(localStorage.getItem('reduxState'));
  // console.log(login.isLogin,datastate);

  // const user = (datastate === null)? login.isLogin : datastate.isLogin;
  // useEffect(() => {

  //   if (!user || user === null) {
  //     navigate('/login'); // Redirect to login page if not logged in
  //   }
  // }, [datastate, navigate]);

  return children; // Render the protected content if logged in
}