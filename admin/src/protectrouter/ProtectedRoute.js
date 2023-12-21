import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getWithExpiry, setWithExpiry } from './handelttl';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const login = useSelector((state) => state.login);

  const datastate =getWithExpiry('reduxState');
  if (datastate === null) {
    setWithExpiry('reduxState',{isLogin: false,isAuthenticated: false,iserror: false,usertype: '', errmsg: ''  });
  }

  const user = datastate === null ? login.isLogin : datastate.isLogin;
  useEffect(() => {

    if (!user) {
      navigate('/'); // Redirect to login page if not logged in
    }
  }, [datastate.isLogin, navigate]);

  return children; // Render the protected content if logged in
}
