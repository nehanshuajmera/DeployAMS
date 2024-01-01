import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';


const NotFoundPage = () => {
  const navigate = useNavigate();

    const {IsLogin}=useContext(AuthContext);

    useEffect(() => {
      if(IsLogin !== null&&IsLogin){
        // window.location.href="/studentattandence"
        navigate('/studentattandence');
      }
    }, [IsLogin])


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
