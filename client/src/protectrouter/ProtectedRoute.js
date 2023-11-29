import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
export default function ProtectedRoute({ children }) {
    const {login} = useSelector((state) => state.login);
    const datastate = JSON.parse(localStorage.getItem('reduxState'));
    const user=datastate === null?login.isLogin:datastate.isLogin;
    console.log("getting");


    if (user) {
        return children;
      }
      else{

          useNavigate('/login')
      }
}
