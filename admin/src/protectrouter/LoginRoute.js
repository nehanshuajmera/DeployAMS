import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export default function LoginRoute({ children }) {
  const navigate = useNavigate();
  const login = useSelector((state) => state.login);

  const datastate = JSON.parse(localStorage.getItem('reduxState'));
  const user = datastate === null ? login.isLogin : datastate.isLogin;
  useEffect(() => {

    if (user) {
      navigate('/teacherdashboard'); // Redirect to login page if not logged in
    }
    else{
      navigate('/')
    }
  }, [datastate, navigate]);

  return children; // Render the Login content if logged in
}
