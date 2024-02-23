import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import './Header.css'

export default function Header() {
  const { logout, userdata } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-md navbar-light" id="nav1">
      <div className="container-fluid" >
        <a href="" className="navbar-brand">
          <img className="img-fluid" id="y" src="https://medicaps.ac.in/resources/img/logo-navbar.png" alt="CollegeLogo" />
        </a>
        <button className="navbar-toggler" data-bs-target="#a" data-bs-toggle="collapse">
                <span className="navbar-toggler-icon" id="n"></span>
            </button>

        <div className="navbar-collapse collapse" id="a">
        <ul className="navbar-nav ms-auto" id="u">
        <li>
            <button className="bttnCss1" onClick={() => navigate('/teacherdashboard')} >
              Teacher Dashboard
            </button>
            </li>
          <li>
            {(userdata?.admin_role === 'Admin' || userdata?.admin_role === 'HOD') && (
              <button className="bttnCss1 " onClick={() => navigate('/dashboard')} >
                Admin Dashboard
              </button>
            )}
            </li>
            <li>
            <button className="bttnCss" onClick={() => logout()} >
              Logout
            </button>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
