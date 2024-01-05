import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import './Header.css'


export default function Header() {
  const { logout ,userdata } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(userdata);
  return (
    <header className="headerContainer text-white">
      <div className="headerDiv">
        {/* Logo and Title */}
        <div className="logoCllg">
          <img src="https://medicaps.ac.in/resources/img/logo-navbar.png" alt="CollegeLogo" className="logoImg"/>
        </div>
        {/* Buttons */}
        <div className="bttnCllg">
          {(userdata?.admin_role === 'Admin'||userdata?.admin_role === 'HOD') && (
            <button className="bttnCss bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={() => navigate('/dashboard')} >
              Admin Dashboard
            </button>
          )}
          <button className="bttnCss bg-red-500 hover:bg-red-600 text-white rounded" onClick={() => logout()} >
            Logout
          </button>
        </div>
      </div>
      <hr className="styleHr" />
    </header>
  );
}
