import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


export default function Header() {
  const { logout ,userdata } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(userdata);
  return (
    <>
      <div className="flex justify-between items-center p-4 text-gray-800">
        <div className="flex items-center space-x-4">
          <img
            src="https://medicaps.ac.in/resources/img/logo-navbar.png"
            alt="CollegeLogo"
            className="h-10"
          />
          <h1 className="text-2xl font-semibold">Medi-Caps</h1>
        </div>
        <div className="flex items-center space-x-4">
          {userdata?.admin_role==="Admin" ? <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={() => {navigate("/dashboard")}}
          >
            Admin Dashboard
          </button>:null}
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
